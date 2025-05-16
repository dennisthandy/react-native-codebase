import Accordion from '@/src/components/commons/Accordion';
import Alert from '@/src/components/commons/Alert';
import Badge from '@/src/components/commons/Badge';
import Button from '@/src/components/commons/Button';
import Grid from '@/src/components/commons/Grid';
import MasonryGrid from '@/src/components/commons/MansoryGrid';
import Text from '@/src/components/commons/Text';
import View from '@/src/components/commons/View';
import { colors } from '@/src/constants/colors.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

export default function Components() {
  const color = useThemeColor({}, 'text');
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
              <Button style={{ marginRight: 8 }} variants="outline">
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
              <Button style={{ marginRight: 8 }} isLoading={true} variants="outline">
                Hello
              </Button>
              <Button style={{ marginRight: 8 }} isLoading={true} loadingPosition="left">
                Hello
              </Button>
              <Button
                style={{ marginRight: 8, backgroundColor: colors.primary.main }}
                isLoading={true}
                variants="outline"
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
        </View>
      </ScrollView>
    </View>
  );
}
