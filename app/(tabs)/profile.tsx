import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Text, 
  Switch, 
  Button, 
  Avatar, 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  Divider, 
  List, 
  useTheme,
  IconButton,
  Surface
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  // Mock user data - replace with actual data from your authentication/state management
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    bio: 'Passionate about learning new skills and sharing knowledge with others.',
    skills: ['Web Development', 'Graphic Design', 'Language Teaching'],
    interests: ['Photography', 'Cooking', 'Hiking'],
  });

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  
  const theme = useTheme();
  const primaryColor = '#28693C'; // Deep Navy primary color
  const accentColor = '#D4AF37';  // Gold Leaf accent color

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Header with Gradient */}
      <Surface style={styles.headerSurface} elevation={4}>
        <LinearGradient
          colors={[primaryColor, '#1D4D2C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Avatar.Image 
              size={120} 
              source={{ uri: user.avatar }} 
              style={styles.avatar}
            />
            <Title style={styles.name}>{user.name}</Title>
            <Text style={styles.email}>{user.email}</Text>
            <Button 
              mode="contained" 
              style={styles.editButton}
              buttonColor={accentColor}
              textColor="#28693C"
              icon="pencil"
              onPress={() => console.log('Edit profile')}
            >
              Edit Profile
            </Button>
          </View>
        </LinearGradient>
      </Surface>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: primaryColor }]}>12</Text>
          <Text style={styles.statLabel}>Skills</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: primaryColor }]}>24</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: primaryColor }]}>8</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>

      {/* Bio Section */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>About Me</Title>
            <IconButton icon="pencil" size={20} iconColor={primaryColor} onPress={() => console.log('Edit bio')} />
          </View>
          <Paragraph style={styles.bioText}>{user.bio}</Paragraph>
        </Card.Content>
      </Card>

      {/* Skills Section */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>My Skills</Title>
            <IconButton 
              icon="plus-circle" 
              size={20} 
              iconColor={primaryColor}
              onPress={() => console.log('Add skill')} 
            />
          </View>
          <View style={styles.chipContainer}>
            {user.skills.map((skill, index) => (
              <Chip 
                key={index} 
                style={[styles.chip, { backgroundColor: `${primaryColor}15` }]} 
                textStyle={{ color: primaryColor }}
                icon={() => <Ionicons name="star" size={16} color={primaryColor} />}
              >
                {skill}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Interests Section */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Interests</Title>
            <IconButton 
              icon="plus-circle" 
              size={20} 
              iconColor={accentColor}
              onPress={() => console.log('Add interest')} 
            />
          </View>
          <View style={styles.chipContainer}>
            {user.interests.map((interest, index) => (
              <Chip 
                key={index} 
                style={[styles.chip, { backgroundColor: `${accentColor}15` }]}
                textStyle={{ color: accentColor }}
                icon={() => <Ionicons name="heart" size={16} color={accentColor} />}
              >
                {interest}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Settings Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Settings</Title>
          <List.Item
            title="Push Notifications"
            titleStyle={styles.settingTitle}
            left={props => <List.Icon {...props} icon="bell" color={primaryColor} />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={primaryColor}
              />
            )}
          />
          <Divider style={styles.settingsDivider} />
          <List.Item
            title="Dark Mode"
            titleStyle={styles.settingTitle}
            left={props => <List.Icon {...props} icon="moon" color={primaryColor} />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={primaryColor}
              />
            )}
          />
          <Divider style={styles.settingsDivider} />
          <List.Item
            title="Private Profile"
            titleStyle={styles.settingTitle}
            left={props => <List.Icon {...props} icon="lock" color={primaryColor} />}
            right={() => (
              <Switch
                value={privateProfile}
                onValueChange={setPrivateProfile}
                color={primaryColor}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button 
        mode="outlined" 
        style={styles.logoutButton}
        textColor="#FF3B30"
        icon="logout"
        onPress={() => console.log('Logout')}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSurface: {
    marginBottom: 16,
    borderRadius: 0,
  },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 12,
  },
  name: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  editButton: {
    marginTop: 8,
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: -20,
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E0E0E0',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    margin: 4,
    borderRadius: 20,
    paddingVertical: 2,
  },
  settingTitle: {
    fontSize: 16,
  },
  settingsDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    borderColor: '#FF3B30',
    borderRadius: 8,
  },
});