import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';

// Mock data for skill matches
const mockMatches = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    skillToTeach: 'Graphic Design',
    skillToLearn: 'Spanish Language',
    matchPercentage: 95,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    skillToTeach: 'Piano Lessons',
    skillToLearn: 'Photography',
    matchPercentage: 88,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    skillToTeach: 'Yoga Instruction',
    skillToLearn: 'Web Development',
    matchPercentage: 82,
  },
  {
    id: '4',
    name: 'James Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
    skillToTeach: 'Guitar Playing',
    skillToLearn: 'Cooking',
    matchPercentage: 79,
  },
];

const MatchCard = ({ match }: { match: { id: string; name: string; avatar: string; skillToTeach: string; skillToLearn: string; matchPercentage: number; } }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.matchPercentageContainer, { backgroundColor: '#28693C' }]}>
        <Text style={styles.matchPercentage}>{match.matchPercentage}%</Text>
      </View>
      <Image source={{ uri: match.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{match.name}</Text>
      <View style={styles.skillContainer}>
        <View style={styles.skillBox}>
          <Text style={styles.skillLabel}>Can teach you</Text>
          <Text style={styles.skillText}>{match.skillToTeach}</Text>
        </View>
        <View style={styles.skillBox}>
          <Text style={styles.skillLabel}>Wants to learn</Text>
          <Text style={styles.skillText}>{match.skillToLearn}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.connectButton, { backgroundColor: '#D4AF37' }]}>
        <Text style={[styles.connectButtonText, { color: '#28693C' }]}>Connect</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function MatchesScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#f8f9fa' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: '#28693C' }]}>Skill Matches</Text>
        <Text style={styles.description}>
          People who want to swap skills with you
        </Text>
      </View>
      
      <FlatList
        data={mockMatches}
        renderItem={({ item }) => <MatchCard match={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  matchPercentageContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchPercentage: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  skillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  skillBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#f0f4f8',
    padding: 10,
    borderRadius: 8,
  },
  skillLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  connectButton: {
    backgroundColor: '#5271ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});