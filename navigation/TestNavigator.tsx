import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OverflowMenu from '../components/OverflowMenu';
import { useAuthContext } from '../hooks/auth';
import { TestContext, useTestInit } from '../hooks/test';
import { StartTestScreen, TestResultScreen, TestScreen } from '../screens';
import { TestStackParamList } from '../types';

const Stack = createNativeStackNavigator<TestStackParamList>();

export default function TestNavigator() {
  const testValue = useTestInit();
  const { logout } = useAuthContext();
  return (
    <TestContext.Provider value={testValue}>
      <Stack.Navigator>
        <Stack.Screen
          name="StartTest"
          component={StartTestScreen}
          options={({ navigation }) => ({
            title: 'Sileo',
            headerRight: () => (
              <OverflowMenu navigation={navigation}>
                <OverflowMenu.Item label="Cerrar sesión" onPress={logout} />
              </OverflowMenu>
            ),
          })}
        />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen
          name="TestResult"
          component={TestResultScreen}
          options={{ title: 'Resultado del test' }}
        />
      </Stack.Navigator>
    </TestContext.Provider>
  );
}
