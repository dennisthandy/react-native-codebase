import Text from '@/src/components/commons/Text';
import View from '@/src/components/commons/View';
import React from 'react';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }} variant="h2">
        Welcome To React Native Codebase
      </Text>
      <Text style={{ textAlign: 'center', marginTop: 6 }}>
        Hope you can build a usefull app for real world problem with this codebase.
      </Text>
    </View>
  );
}
