import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from './src/styles/colors';
import { RootStackParamList } from './src/types';

import HomeScreen from './src/screens/HomeScreen';
import RequestDetailScreen from './src/screens/RequestDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors?.primary?.[600] || '#007BFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Tareeqk Driver',
          }}
        />
        <Stack.Screen
          name="RequestDetail"
          component={RequestDetailScreen}
          options={{
            title: 'Request Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
