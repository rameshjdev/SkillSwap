import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SkillsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills</Text>
      <Text style={styles.description}>Manage your skills and interests</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});