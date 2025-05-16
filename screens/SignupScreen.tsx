import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StatusBar, SafeAreaView, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Onboarding: undefined;
  Signup: undefined;
  MainApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle signup
  const handleSignUp = async () => {
    try {
      setError('');
      setIsLoading(true);

      // Validate inputs
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // TODO: Implement your authentication logic here
      // This is a placeholder for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      Alert.alert(
        'Success',
        'Account created successfully',
        [{ text: 'OK', onPress: () => navigation.navigate('MainApp') }]
      );
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred during signup';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);

      // Validate inputs
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      // TODO: Implement your authentication logic here
      // This is a placeholder for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      navigation.navigate('MainApp');
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred during login';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (activeTab === 'signup') {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#FFDE59', '#FFDE59']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
            
            <View style={styles.header}>
              <Text style={styles.title}>{activeTab === 'signup' ? 'Sign up now to access' : 'Welcome back to'}</Text>
              <Text style={styles.title}>{activeTab === 'signup' ? 'your personal account' : 'your account'}</Text>
              <Text style={styles.subtitle}>
                {activeTab === 'signup' 
                  ? 'Sign up to access your account and exclusive features.' 
                  : 'Log in to continue your skill-sharing journey.'}
              </Text>
            </View>
            
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={activeTab === 'login' ? styles.tabActive : styles.tabInactive}
                onPress={() => setActiveTab('login')}
              >
                <Text style={activeTab === 'login' ? styles.tabTextActive : styles.tabTextInactive}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={activeTab === 'signup' ? styles.tabActive : styles.tabInactive}
                onPress={() => setActiveTab('signup')}
              >
                <Text style={activeTab === 'signup' ? styles.tabTextActive : styles.tabTextInactive}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.form}>
              {activeTab === 'signup' ? (
                // Signup Form
                <>
                  <View style={styles.nameRow}>
                    <View style={styles.nameField}>
                      <Text style={styles.inputLabel}>First Name</Text>
                      <View style={[styles.inputContainer, firstName ? styles.inputFilled : null]}>
                        <TextInput
                          style={styles.input}
                          placeholder="Wade"
                          value={firstName}
                          onChangeText={setFirstName}
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                    </View>
                    
                    <View style={styles.nameField}>
                      <Text style={styles.inputLabel}>Last Name</Text>
                      <View style={[styles.inputContainer, lastName ? styles.inputFilled : null]}>
                        <TextInput
                          style={styles.input}
                          placeholder="Warren"
                          value={lastName}
                          onChangeText={setLastName}
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                    </View>
                  </View>
                  
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={[styles.inputContainer, email ? styles.inputFilled : null]}>
                    <TextInput
                      style={styles.input}
                      placeholder="wadewarren@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={[styles.inputContainer, password ? styles.inputFilled : null]}>
                    <TextInput
                      style={styles.input}
                      placeholder="xxxxxxxx"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#28693C" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={[styles.inputContainer, confirmPassword ? styles.inputFilled : null]}>
                    <TextInput
                      style={styles.input}
                      placeholder="xxxxxxxx"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#28693C" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                // Login Form
                <>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={[styles.inputContainer, email ? styles.inputFilled : null]}>
                    <TextInput
                      style={styles.input}
                      placeholder="wadewarren@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={[styles.inputContainer, password ? styles.inputFilled : null]}>
                    <TextInput
                      style={styles.input}
                      placeholder="xxxxxxxx"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#28693C" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
              
              {/* Modern Button for Register/Login */}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Animated.View style={styles.loadingContainer}>
                    <View style={styles.loadingDot} />
                    <View style={styles.loadingDot} />
                    <View style={styles.loadingDot} />
                  </Animated.View>
                ) : (
                  <Text style={styles.actionButtonText}>
                    {activeTab === 'signup' ? 'Create Account' : 'Log In'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFDE59',
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tabActive: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  tabTextInactive: {
    color: '#666',
  },
  form: {
    gap: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFilled: {
    borderColor: '#28693C',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    padding: 4,
  },
  actionButton: {
    backgroundColor: '#28693C',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    opacity: 0.7,
  },
}); 