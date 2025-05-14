import Badge from '@/src/components/commons/Badge';
import MasonryGrid from '@/src/components/commons/MansoryGrid';
import Text from '@/src/components/commons/Text';
import View from '@/src/components/commons/View';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Sample data
type Data = { id: string; title: string; description: string };
const items: Data[] = [
  { id: '1', title: 'Item 1', description: 'Description for item 1' },
  { id: '2', title: 'Item 2', description: 'Description for item 2' },
  { id: '3', title: 'Item 3', description: 'Description for item 3' },
  { id: '4', title: 'Item 4', description: 'Description for item 4' },
  { id: '5', title: 'Item 4', description: 'Description for item 5' },
  { id: '5', title: 'Item 4', description: 'Description for item 5' },
];
const masonryItems = [
  {
    id: '1',
    title: 'Hiking Trip',
    image: 'https://via.placeholder.com/400x600',
    height: 250,
    color: '#FFD700',
  },
  {
    id: '2',
    title: 'Beach Sunset',
    image: 'https://via.placeholder.com/400x300',
    height: 180,
    color: '#90EE90',
  },
  {
    id: '3',
    title: 'City Skyline',
    image: 'https://via.placeholder.com/400x500',
    height: 220,
    color: '#ADD8E6',
  },
  {
    id: '4',
    title: 'Mountain View',
    image: 'https://via.placeholder.com/400x700',
    height: 280,
    color: '#FFA07A',
  },
  {
    id: '5',
    title: 'Forest Path',
    image: 'https://via.placeholder.com/400x450',
    height: 200,
    color: '#E6E6FA',
  },
  {
    id: '6',
    title: 'Ocean Waves',
    image: 'https://via.placeholder.com/400x350',
    height: 190,
    color: '#FFDAB9',
  },
  {
    id: '7',
    title: 'Desert Landscape',
    image: 'https://via.placeholder.com/400x550',
    height: 230,
    color: '#F0E68C',
  },
  {
    id: '8',
    title: 'Snowy Mountains',
    image: 'https://via.placeholder.com/400x400',
    height: 210,
    color: '#B0C4DE',
  },
];

export default function Home() {
  const renderItem = ({ item }: { item: Data }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const renderMasonryItem = ({ item }: { item: (typeof masonryItems)[0] }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: item.color, height: item.height }]}
        onPress={() => console.log(`Masonry item ${item.id} pressed`)}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.itemImage, { height: item.height * 0.65 }]}
          resizeMode="cover"
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="h2">Home</Text>
      <ScrollView horizontal style={{ backgroundColor: 'white', flexGrow: 0 }}>
        <Badge value="Danger" type="danger" />
        <Badge value="Info" type="info" />
        <Badge value="Neutral" type="neutral" />
        <Badge value="Primary" type="primary" />
        <Badge value="Success" type="success" />
        <Badge value="Warning" type="warning" />
        <Badge value="Danger" type="danger" variant="outlined" />
        <Badge value="Info" type="info" variant="outlined" />
        <Badge value="Neutral" type="neutral" variant="outlined" />
        <Badge value="Primary" type="primary" variant="outlined" />
        <Badge value="Success" type="success" variant="outlined" />
        <Badge value="Warning" type="warning" variant="outlined" />
      </ScrollView>
      <MasonryGrid data={masonryItems} renderItem={renderMasonryItem} numColumns={2} spacing={12} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
  itemContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemImage: {
    width: '100%',
  },
});
