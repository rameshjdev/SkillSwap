import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Onboarding: undefined;
  Signup: undefined;
  MainApp: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Skills: undefined;
  Matches: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>; 