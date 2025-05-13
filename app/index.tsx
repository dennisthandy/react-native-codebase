// app/index.js
import { ONBOARDING_STATUS } from '@/src/constants/storage.constants';
import { usePersistedState } from '@/src/hooks/usePersistedState';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useStore';
import { checkAuthStatus } from '@/src/store/slices/auth/auth.thunks';
import { Href, Redirect } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const dispatch = useAppDispatch();
  const [onboarding, _, isLoadingOnboarding] = usePersistedState(ONBOARDING_STATUS, {
    status: false,
  });
  const { data, isLoading } = useAppSelector(state => state.auth.status);

  useEffect(() => {
    dispatch(checkAuthStatus({}));
  }, [dispatch]);

  if (isLoading || isLoadingOnboarding) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (data?.isAuthenticated) {
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
