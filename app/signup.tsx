import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StatusBar, SafeAreaView, Animated, PanResponder } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State for loading animation
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/(tabs)');
    }, 1500);
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
              onPress={() => router.back()}
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
                  
                  {/* Modern Button for Register */}
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
                      <Text style={styles.actionButtonText}>Create Account</Text>
                    )}
                  </TouchableOpacity>
                  
                  <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>
                      By signing up, you agree to our{' '}
                      <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                      <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
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
                  
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  
                  {/* Modern Button for Login */}
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
                      <Text style={styles.actionButtonText}>Log In</Text>
                    )}
                  </TouchableOpacity>
                  
                  <View style={styles.socialLoginContainer}>
                    <View style={styles.divider}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or continue with</Text>
                      <View style={styles.dividerLine} />
                    </View>
                    
                    <View style={styles.socialButtons}>
                      <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-google" size={20} color="#333" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={20} color="#333" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-facebook" size={20} color="#333" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
    marginTop: 8,
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tabTextActive: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tabTextInactive: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameField: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderColor: '#E5E7EB',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  inputFilled: {
    borderColor: '#28693C',
    borderWidth: 1.5,
    backgroundColor: 'rgba(40, 105, 60, 0.05)',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1F2937',
  },
  eyeIcon: {
    padding: 6,
  },
  actionButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#28693C',
    fontSize: 14,
    fontWeight: '500',
  },
  // Loading animation styles
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    margin: 3,
    opacity: 0.8,
  },
  // Terms and conditions
  termsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#28693C',
    fontWeight: '500',
  },
  // Social login
  socialLoginContainer: {
    marginTop: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});