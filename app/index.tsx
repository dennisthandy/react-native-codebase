// app/index.js
import { useAppSelector } from '@/src/hooks/useStore';
import { Href, Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const { data: isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth.login
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href={'/(app)' as Href} />;
  }

  return <Redirect href={'/(auth)/login' as Href} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
