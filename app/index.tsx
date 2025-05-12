// app/index.js
import { ONBOARDING_STATUS } from '@/src/constants/storage.constants';
import { usePersistedState } from '@/src/hooks/usePersistedState';
import { useAppSelector } from '@/src/hooks/useStore';
import { Href, Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const [onboarding, _, isLoadingOnboarding] = usePersistedState(ONBOARDING_STATUS, {
    status: false,
  });
  const { data: isAuthenticated, isLoading } = useAppSelector(state => state.auth.login);

  if (isLoading || isLoadingOnboarding) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href={'/(app)' as Href} />;
  }

  if (onboarding.status) {
    return <Redirect href={'/(auth)/login' as Href} />;
  }

  return <Redirect href={'/onboarding' as Href} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
