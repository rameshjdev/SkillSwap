import React from 'react';
import { Redirect, Stack } from 'expo-router';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Redirect href="/onboarding" />
    </>
  );
}
