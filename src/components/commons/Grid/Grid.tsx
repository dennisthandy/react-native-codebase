import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

type Props<T> = FlatListProps<T> & { spacing?: number; containerStyle?: ViewProps['style'] };

export function Grid<T>({
  data,
  renderItem,
  numColumns = 2,
  spacing = 10,
  containerStyle,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ...props
}: Props<T>) {
  // Calculate item dimensions based on number of columns and spacing
  const renderGridItem = ({ item, index }: { item: T; index: number }) => {
    const isLastInRow = (index + 1) % numColumns === 0;
    const isLastRow =
      Math.ceil(Number(data?.length) / numColumns) === Math.ceil((index + 1) / numColumns);
    const isLastItem = index === Number(data?.length) - 1;
    return (
      <View
        style={[
          styles.gridItem,
          {
            marginRight: isLastInRow || isLastItem ? 0 : spacing,
            marginBottom: isLastRow ? 0 : spacing,
            width: `${100 / numColumns - (spacing * (numColumns - 1)) / numColumns}%`,
          },
        ]}
      >
        {renderItem ? renderItem({ item, index } as ListRenderItemInfo<T>) : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        renderItem={renderGridItem}
        keyExtractor={(_, index) => `grid-item-${index}`}
        numColumns={numColumns}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  gridItem: {
    flex: 1,
  },
});
