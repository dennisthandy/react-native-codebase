import Accordion from '@/src/components/commons/Accordion';
import Alert from '@/src/components/commons/Alert';
import Badge from '@/src/components/commons/Badge';
import BottomSheet from '@/src/components/commons/BottomSheet';
import Button from '@/src/components/commons/Button';
import Card from '@/src/components/commons/Card';
import Carousel from '@/src/components/commons/Carousel';
import Grid from '@/src/components/commons/Grid';
import MasonryGrid from '@/src/components/commons/MansoryGrid';
import Text from '@/src/components/commons/Text';
import { ToastManager } from '@/src/components/commons/Toastr/Toastr';
import View from '@/src/components/commons/View';
import TextInput from '@/src/components/forms/TextInput';
import { colors } from '@/src/constants/colors.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { formatCurrency } from '@/src/utils/common.utils';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView } from 'react-native';
import { z } from 'zod';

const defaultValues = {
  textInput: '',
  textInputNumber: '',
  textInputPassword: '',
  textInputEmail: '',
  textInputArea: '',
  textInputWithFormatter: '',
};

const formSchema = z.object({
  textInput: z.string().min(1, { message: 'Text input is required' }),
  textInputNumber: z.string().min(1, { message: 'Text input number is required' }),
  textInputPassword: z.string().min(1, { message: 'Text input password is required' }),
  textInputEmail: z.string().email({ message: 'Email is required' }),
  textInputArea: z.string().min(1, { message: 'Text input area is required' }),
  textInputWithFormatter: z.string().min(1, { message: 'Text input formatter is required' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Components() {
  const color = useThemeColor({}, 'text');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { control, handleSubmit } = useForm({ defaultValues, resolver: zodResolver(formSchema) });

  const showToast = (type: string) => {
    switch (type) {
      case 'success':
        ToastManager.success({ message: 'Operation completed successfully!' });
        break;
      case 'error':
        ToastManager.error({ message: 'Something went wrong. Please try again.' });
        break;
      case 'info':
        ToastManager.info({ message: 'Here is some information for you.' });
        break;
      case 'warning':
        ToastManager.warning({ message: 'Warning: This action cannot be undone.' });
        break;
      case 'action':
        ToastManager.showToast({
          message: 'Would you like to undo?',
          actionText: 'UNDO',
          type: 'info',
          duration: 5000,
          onPress: () => console.log('Undo pressed'),
        });
        break;
      case 'top':
        ToastManager.info({ message: 'Toast at the top', options: { position: 'top' } });
        break;
      default:
        ToastManager.showToast({ message: 'Default toast message' });
    }
  };

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ borderBottomWidth: 1, borderColor: color, paddingBottom: 4 }}>
          <Text variant="h2" style={{ color: colors.primary.main }}>
            Commons
          </Text>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Accordion
            </Text>
            <Accordion
              data={[
                {
                  title: 'How it works ?',
                  content:
                    'This is the content for section 1. It can contain any text or components.',
                },
                {
                  title: 'How it works with component ?',
                  content: (
                    <View style={{ backgroundColor: colors.primary.main }}>
                      <Text>This is accordion with component content</Text>
                    </View>
                  ),
                },
              ]}
            />
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Badge
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 4 }}
            >
              <Badge value="Hello" style={{ marginRight: 4 }} />
              <Badge value="Hello" variant="outlined" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="success" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="success" variant="outlined" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="danger" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="danger" variant="outlined" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="info" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="info" variant="outlined" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="neutral" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="neutral" variant="outlined" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="warning" style={{ marginRight: 4 }} />
              <Badge value="Hello" type="warning" variant="outlined" />
            </ScrollView>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Button
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Button style={{ marginRight: 8 }}>Hello</Button>
              <Button variants="icon" style={{ marginRight: 8 }}>
                <MaterialCommunityIcons name="account" />
              </Button>
              <Button style={{ marginRight: 8 }} variants="outlined">
                Hello
              </Button>
              <Button style={{ marginRight: 8 }} variants="text">
                Hello
              </Button>
              <Button
                leftIcon={<MaterialCommunityIcons name="account" />}
                style={{ marginRight: 8 }}
              >
                Hello
              </Button>
              <Button
                style={{ marginRight: 8 }}
                rightIcon={<MaterialCommunityIcons name="account" />}
              >
                Hello
              </Button>
              <Button style={{ marginRight: 8 }} isLoading={true}>
                Hello
              </Button>
              <Button style={{ marginRight: 8 }} isLoading={true} variants="outlined">
                Hello
              </Button>
              <Button style={{ marginRight: 8 }} isLoading={true} loadingPosition="left">
                Hello
              </Button>
              <Button
                style={{ marginRight: 8, backgroundColor: colors.primary.main }}
                isLoading={true}
                variants="outlined"
                loadingPosition="right"
              >
                Hello
              </Button>
            </ScrollView>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Grid
            </Text>
            <Grid
              data={[
                { content: 'Grid 1' },
                { content: 'Grid 2' },
                { content: 'Grid 3' },
                { content: 'Grid 4' },
                { content: 'Grid 5' },
                { content: 'Grid 6' },
                { content: 'Grid 7' },
                { content: 'Grid 8' },
              ]}
              numColumns={3}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: colors.primary.main,
                    padding: 4,
                    height: 44,
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {item.content}
                  </Text>
                </View>
              )}
            />
          </View>
          <View style={{ marginTop: 4, display: 'none' }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Mansory Grid
            </Text>
            <MasonryGrid
              data={[
                {
                  color: colors.primary.main,
                  height: 200,
                  id: 'grid-1',
                  image: '',
                  title: 'Grid 1',
                },
                {
                  color: colors.secondary.main,
                  height: 100,
                  id: 'grid-2',
                  image: '',
                  title: 'Grid 2',
                },
                {
                  color: colors.support.error[500],
                  height: 300,
                  id: 'grid-3',
                  image: '',
                  title: 'Grid 3',
                },
                {
                  color: colors.support.success[500],
                  height: 250,
                  id: 'grid-4',
                  image: '',
                  title: 'Grid 4',
                },
                {
                  color: colors.support.warning[500],
                  height: 150,
                  id: 'grid-5',
                  image: '',
                  title: 'Grid 5',
                },
              ]}
              numColumns={3}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: item.color,
                    padding: 4,
                    height: item.height,
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              )}
            />
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Alert
            </Text>
            <Alert message="This is alert" style={{ marginBottom: 8 }} />
            <Alert
              message="This is alert"
              closeable={false}
              description="This is alert description"
              variant="info"
              style={{ marginBottom: 8 }}
            />
            <Alert
              message="This is alert"
              closeable={false}
              variant="error"
              style={{ marginBottom: 8 }}
            />
            <Alert
              message="This is alert"
              closeable={false}
              variant="success"
              style={{ marginBottom: 8 }}
            />
            <Alert message="This is alert" variant="warning" style={{ marginBottom: 8 }} />
            <Alert
              message="This is alert"
              icon={
                <MaterialCommunityIcons
                  name="account"
                  size={22}
                  color={colors.support.warning[800]}
                />
              }
              variant="warning"
              style={{ marginBottom: 8 }}
            />
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Card
            </Text>
            <View style={{ paddingHorizontal: 4 }}>
              <Card title="Basic Card" subtitle="Test Subtitle">
                <Text>This is a simple card with some content.</Text>
              </Card>
              <Card
                title="Card with Image"
                subtitle="Beautiful scenery"
                imageSource="https://images.unsplash.com/photo-1742017193358-e4f271a6b7b9?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageHeight={180}
                shadowIntensity={5}
              >
                <Text>This card has an image header.</Text>
              </Card>
              <Card
                variant="outlined"
                title="Outlined Card"
                subtitle="test"
                footer={
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button style={{ marginRight: 8 }}>Cancel</Button>
                    <Button variants="outlined">Ok</Button>
                  </View>
                }
              >
                <Text>This card has a custom footer with buttons.</Text>
              </Card>
              <Card
                title="Touchable Card"
                subtitle="Click me"
                shadowIntensity={3}
                onPress={() => console.log('Card pressed')}
              >
                <Text>This entire card is touchable.</Text>
              </Card>
            </View>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Carousel
            </Text>
            <View style={{ paddingHorizontal: 4 }}>
              <Carousel
                showArrows
                style={{ borderRadius: 8 }}
                data={[
                  { id: 1, title: 'Slide 1', color: '#FF5722' },
                  { id: 2, title: 'Slide 2', color: '#03A9F4' },
                  { id: 3, title: 'Slide 3', color: '#4CAF50' },
                ]}
                height={250}
                renderItem={(item, index) => (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: item.color,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 24 }}>{item.title}</Text>
                  </View>
                )}
              />
            </View>
            <View style={{ paddingHorizontal: 4, marginTop: 8 }}>
              <Carousel
                data={[
                  {
                    uri: 'https://plus.unsplash.com/premium_photo-1747371476846-1af8fbc9f3c3?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  },
                  {
                    uri: 'https://plus.unsplash.com/premium_photo-1747135794838-a6afe928a90c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  },
                  {
                    uri: 'https://images.unsplash.com/photo-1746937807433-05748b80caf4?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  },
                ]}
                height={300}
                showIndicators={true}
                showArrows={true}
                autoPlay={true}
                autoPlayInterval={2500}
                loop={true}
                initialIndex={1}
                // onSlideChange={index => console.log('Current slide:', index)}
                activeIndicatorColor="#2196F3"
                inactiveIndicatorColor="#BBDEFB"
                renderItem={(item, index) => (
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                )}
              />
            </View>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Bottom Sheet
            </Text>
            <Button onPress={() => setBottomSheetVisible(true)}>Open</Button>
            <BottomSheet
              visible={bottomSheetVisible}
              onClose={() => setBottomSheetVisible(false)}
              enableBackdropDismiss={true}
            >
              <View>
                <Text>Bottom Sheet</Text>
                <Text>
                  This is a draggable bottom sheet that uses our custom Portal system. Try dragging
                  it up and down to see how it snaps to different heights.
                </Text>
                <Button onPress={() => setBottomSheetVisible(false)}>Close</Button>
              </View>
            </BottomSheet>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Toastr
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Button
                style={{ backgroundColor: colors.support.success[500], marginRight: 8 }}
                onPress={() => showToast('success')}
              >
                Success
              </Button>
              <Button
                style={{ backgroundColor: colors.support.error[500], marginRight: 8 }}
                onPress={() => showToast('error')}
              >
                Error
              </Button>
              <Button
                style={{ backgroundColor: colors.support.info[500], marginRight: 8 }}
                onPress={() => showToast('info')}
              >
                Info
              </Button>
              <Button
                style={{ backgroundColor: colors.support.warning[500], marginRight: 8 }}
                onPress={() => showToast('warning')}
              >
                Warning
              </Button>
              <Button
                style={{ backgroundColor: colors.support.success[500], marginRight: 8 }}
                onPress={() => showToast('action')}
              >
                With Action
              </Button>
              <Button
                style={{ backgroundColor: colors.support.info[500], marginRight: 8 }}
                onPress={() => showToast('top')}
              >
                Top Toast
              </Button>
            </ScrollView>
          </View>
        </View>
        <View style={{ borderBottomWidth: 1, borderColor: color, paddingBottom: 4 }}>
          <Text variant="h2" style={{ color: colors.primary.main }}>
            Forms
          </Text>
          <View style={{ marginTop: 4 }}>
            <Text variant="h3" style={{ marginBottom: 4 }}>
              Text Inputs
            </Text>
            <View style={{ paddingHorizontal: 4 }}>
              <TextInput
                placeholder="Enter a text"
                name="textInput"
                control={control}
                label={'Text Input'}
                leftIcon={<Ionicons name="search" size={16} color={color} />}
              />
              <TextInput
                placeholder="Enter a text"
                name="textInputNumber"
                control={control}
                label={'Text Input Number'}
                rightLabel="Kg"
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Enter a text"
                name="textInputPassword"
                control={control}
                label={'Text Input Password'}
                secureTextEntry={true}
              />
              <TextInput
                placeholder="Enter a email"
                name="textInputEmail"
                control={control}
                label={'Text Input Email'}
                rightIcon={<Ionicons name="mail" size={16} color={color} />}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Enter a area"
                name="textInputArea"
                control={control}
                label={'Text Input Area'}
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                leftLabel="$"
                placeholder="Enter a formatted text"
                name="textInputWithFormatter"
                control={control}
                label={'Text Input Formater'}
                formatter={formatCurrency}
              />
              <Button style={{ width: '100%' }} onPress={handleSubmit(v => console.log(v))}>
                Submit
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
