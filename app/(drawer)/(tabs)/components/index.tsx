import Accordion from '@/src/components/commons/Accordion';
import Text from '@/src/components/commons/Text';
import View from '@/src/components/commons/View';

const accordionData = [
  {
    title: 'Section 1',
    content: 'This is the content for section 1. It can contain any text or components.',
  },
  {
    title: 'Section 2',
    content: 'Content for section 2 goes here. You can expand and collapse this section.',
  },
  {
    title: 'Section 3',
    content: (
      <View>
        <Text>You can also use React components as content!</Text>
        <View style={{ height: 20 }} />
        <Text>This gives you more flexibility in your design.</Text>
      </View>
    ),
  },
];
export default function Components() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Components</Text>
      <Accordion style={{ paddingHorizontal: 8 }} data={accordionData} allowMultiple />
    </View>
  );
}
