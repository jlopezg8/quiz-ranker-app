import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { OpenAPI } from './api';
import { AuthContext, useAuthInit } from './hooks/auth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import './utils/ignoreReactQueryLongTimerWarning';

OpenAPI.BASE = 'https://e7kxki.deta.dev';

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const authValue = useAuthInit();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete || authValue.isLoading) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={authValue}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <PaperProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </PaperProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AuthContext.Provider>
    );
  }
}
