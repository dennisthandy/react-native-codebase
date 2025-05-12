import Button from '@/src/components/commons/Button';
import Text from '@/src/components/commons/Text';
import View from '@/src/components/commons/View';
import { colors } from '@/src/constants/colors.constants';
import { ONBOARDING_STATUS } from '@/src/constants/storage.constants';
import { useScreenOptions } from '@/src/hooks/useHeaderOptions';
import { dimensions } from '@/src/utils/dimension.utils';
import { setStorage } from '@/src/utils/storage.utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, useColorScheme } from 'react-native';

const slideItems = [
  {
    title: 'Selamat Datang di Ringan',
    description:
      'Aplikasi sistem kasir untuk pelaku UMKM, membantu proses pencatatan penjualan Anda menjadi lebih mudah',
    image: '',
  },
  {
    title: 'Kategorikan Semuanya',
    description:
      'Atur setiap penjualan menu, hingga pelanggan tetap Anda dengan fitur kategori yang menarik dan memudahkan',
    image: '',
  },
  {
    title: 'Laporan Pasti Akurat',
    description:
      'Informasi laporan penjualan Anda akan secara otomatis terekam untuk memantau laba penjualan setiap harinya',
    image: '',
  },
];

export default function Onboarding() {
  useScreenOptions({ headerShown: false });
  const theme = useColorScheme();
  const backgroundColor = colors.primary[theme as keyof typeof colors.primary];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const isLastPage = currentIndex >= slideItems.length - 1;
  const scrollToItem = useCallback((idx: number) => {
    scrollViewRef.current?.scrollTo({ x: idx * dimensions.width, animated: true });
  }, []);

  useEffect(() => {
    scrollToItem(currentIndex);
  }, [currentIndex, scrollToItem]);

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        horizontal
        onScroll={event => {
          const scrollX = event.nativeEvent.contentOffset.x;
          const index = Math.round(scrollX / dimensions.width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {slideItems.map(item => {
          return (
            <View
              key={item.title}
              style={{ maxWidth: dimensions.width, justifyContent: 'center', alignItems: 'center' }}
            >
              <View
                style={{
                  backgroundColor,
                  height: dimensions.width / 2,
                  width: dimensions.width / 2,
                  borderRadius: dimensions.width,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 'auto',
                }}
              >
                <MaterialCommunityIcons name="currency-usd" size={54} />
              </View>
              <Text variant="h1" style={{ marginTop: 16, textAlign: 'center' }}>
                {item.title}
              </Text>
              <Text style={{ marginHorizontal: 16, textAlign: 'center' }}>{item.description}</Text>
            </View>
          );
        })}
      </Animated.ScrollView>
      <View
        style={{ position: 'absolute', bottom: 16 * 2, left: 16, flexDirection: 'row', gap: 6 }}
      >
        {slideItems.map((item, idx) => {
          return (
            <View
              key={item.description}
              style={{
                backgroundColor: idx === currentIndex ? backgroundColor : colors.gray[500],
                width: 12,
                height: 12,
                borderRadius: 16,
              }}
            />
          );
        })}
      </View>
      <Button
        style={{
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 16,
          right: 16,
          borderRadius: 10,
          borderColor: 'white',
          borderWidth: 1,
          height: 52,
          width: isLastPage ? 64 : 52,
        }}
        variants="icon"
        onPress={async () => {
          if (isLastPage) {
            await setStorage(ONBOARDING_STATUS, { status: true });
            router.replace('/(auth)/login');
          } else {
            scrollToItem(currentIndex + 1);
          }
        }}
        textProps={{ style: { color: colors.neutral.background } }}
      >
        {isLastPage ? (
          'Mulai'
        ) : (
          <MaterialCommunityIcons size={22} name="arrow-right" color={colors.neutral.background} />
        )}
      </Button>
    </View>
  );
}
