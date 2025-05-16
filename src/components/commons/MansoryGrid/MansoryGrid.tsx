import { dimensions } from '@/src/utils/dimension.utils';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatListProps,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

type Props = Omit<FlatListProps<MansoryItem>, 'data'> & {
  spacing?: number;
  containerStyle?: ViewProps['style'];
  data: MansoryItem[];
};

export function MasonryGrid({
  data = [],
  renderItem,
  numColumns = 2,
  spacing = 10,
  containerStyle,
}: Props) {
  const [columns, setColumns] = useState<MansoryItem[][]>(
    Array.from({ length: numColumns }, () => []),
  );
  const screenWidth = dimensions.width;
  const columnWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

  // Distribute items across columns
  const distributeItemsInColumns = useCallback(() => {
    const newColumns = Array.from({ length: numColumns }, () => []) as MansoryItem[][];
    const newColumnHeights = Array(numColumns).fill(0);

    // Simple logic to distribute items among columns
    // For a more accurate layout, you'd need to know each item's height in advance
    data.forEach((item, index) => {
      // Find the column with the lowest height
      const shortestColumnIndex = newColumnHeights.indexOf(Math.min(...newColumnHeights));

      // Estimate height for this item (this is a simplification)
      // In a real app, you might use item properties to estimate height
      const estimatedHeight = item.height || 150 + Math.random() * 150;

      // Add item to the shortest column
      newColumns[shortestColumnIndex].push({ ...item, index });

      // Update the column height
      newColumnHeights[shortestColumnIndex] += estimatedHeight + spacing;
    });

    setColumns(newColumns);
  }, [data, numColumns, spacing]);

  // Reset columns when data or number of columns changes
  useEffect(() => {
    distributeItemsInColumns();
  }, [data, distributeItemsInColumns, numColumns]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, containerStyle]}>
      <View style={styles.gridContainer}>
        {columns.map((column, columnIndex) => (
          <View
            key={`column-${columnIndex}`}
            style={[
              styles.column,
              {
                width: columnWidth,
                marginLeft: columnIndex === 0 ? 0 : spacing,
              },
            ]}
          >
            {column.map(item => (
              <View
                key={`item-${item.id || item.index}`}
                style={[styles.itemContainer, { marginBottom: spacing }]}
              >
                {renderItem
                  ? renderItem({ item, index: item.index } as ListRenderItemInfo<MansoryItem>)
                  : null}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  itemContainer: {
    overflow: 'hidden',
  },
});
