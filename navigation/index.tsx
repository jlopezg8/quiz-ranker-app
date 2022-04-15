/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { useAuthContext } from '../hooks/auth';
import { RootStackParamList } from '../types';
import AuthNavigator from './AuthNavigator';
import TestNavigator from './TestNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation(
  { colorScheme }: { colorScheme: ColorSchemeName }
) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  const { isLoggedIn, isLogout } = useAuthContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn
        ? <Stack.Screen name="TestNav" component={TestNavigator} />
        : <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLogout ? 'pop' : 'push',
            }}
          />
      }
    </Stack.Navigator>
  );
}
