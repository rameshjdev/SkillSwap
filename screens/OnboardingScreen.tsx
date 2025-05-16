import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Onboarding: undefined;
  Signup: undefined;
  MainApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [slideAnimation] = useState(new Animated.Value(0));
  const [slideComplete, setSlideComplete] = useState(false);
  
  const maxSlide = 330; // Maximum slide distance
  const threshold = maxSlide * 0.7; // Threshold to trigger navigation
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Limit the drag to horizontal direction and within bounds
      const dx = Math.max(0, Math.min(gestureState.dx, maxSlide));
      slideAnimation.setValue(dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx >= threshold) {
        // Complete the slide animation
        Animated.timing(slideAnimation, {
          toValue: maxSlide,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setSlideComplete(true);
          // Navigate after a short delay to show the completed slide
          setTimeout(() => navigation.navigate('Signup'), 200);
        });
      } else {
        // Return to start position
        Animated.spring(slideAnimation, {
          toValue: 0,
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Calculate button background opacity based on slide progress
  const buttonBackgroundOpacity = slideAnimation.interpolate({
    inputRange: [0, maxSlide],
    outputRange: [1, 0.5],
  });

  // Calculate text opacity based on slide progress
  const textOpacity = slideAnimation.interpolate({
    inputRange: [0, maxSlide * 0.8],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      {/* Profile pictures grid */}
      <View style={styles.profileGrid}>
        <View style={styles.profileRow}>
          <View style={[styles.profileBox, styles.smallProfile, styles.orangeBox]}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.profileImage} 
            />
          </View>
          <View style={[styles.profileBox, styles.smallProfile, styles.pinkBox]}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
              style={styles.profileImage} 
            />
          </View>
        </View>
        <View style={styles.profileRow}>
          <View style={[styles.profileBox, styles.smallProfile, styles.orangeBox]}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} 
              style={styles.profileImage} 
            />
          </View>
          <View style={[styles.profileBox, styles.largeProfile, styles.pinkBox]}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }} 
              style={styles.profileImage} 
            />
          </View>
        </View>
      </View>

      {/* Bottom text and button */}
      <View style={styles.bottomContent}>
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.subtitle}>
          Unlock a world of limitless skills and knowledge with our free and rewarding app. We're ready to go!
        </Text>
        
        {/* Slider Button */}
        <View style={styles.sliderContainer}>
          <Animated.View 
            style={[
              styles.sliderBackground,
              { opacity: buttonBackgroundOpacity }
            ]}
          />
          <Animated.View 
            style={[
              styles.sliderButton,
              { transform: [{ translateX: slideAnimation }] }
            ]}
            {...panResponder.panHandlers}
          >
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Animated.View>
          <Animated.Text 
            style={[
              styles.sliderText,
              { opacity: textOpacity }
            ]}
          >
            Slide to Get Started
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDE59', // Yellow background color
    padding: 20,
    justifyContent: 'space-between',
  },
  profileGrid: {
    marginTop: 80,
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileBox: {
    borderRadius: 20,
    margin: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallProfile: {
    width: 80,
    height: 80,
  },
  largeProfile: {
    width: 120,
    height: 120,
  },
  orangeBox: {
    backgroundColor: '#FFC069',
  },
  pinkBox: {
    backgroundColor: '#FFB6C1',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomContent: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 32,
    lineHeight: 22,
  },
  // Slider styles
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: 56,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderBackground: {
    position: 'absolute',
    width: '100%',
    height: 56,
    backgroundColor: '#333',
    borderRadius: 28,
  },
  sliderButton: {
    position: 'absolute',
    left: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 2,
  },
  sliderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    zIndex: 1,
  },
}); 