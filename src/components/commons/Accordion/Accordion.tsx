import React, { useState } from 'react';
import { TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import AccordionItem from './parts/AccordionItem';

type AccordionProps = ViewProps & {
  data: {
    title: string;
    content: string | React.ReactNode;
  }[];
  allowMultiple?: boolean;
  titleStyle?: TextStyle;
  contentStyle?: TextStyle;
  headerStyle?: ViewStyle;
  iconStyle?: TextStyle;
  itemStyle?: ViewStyle;
};

// Multiple Accordion Items Component
export const Accordion: React.FC<AccordionProps> = ({
  data,
  allowMultiple = false,
  titleStyle,
  contentStyle,
  style,
  headerStyle,
  iconStyle,
  itemStyle,
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setExpandedItems(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        } else {
          return [...prev, index];
        }
      });
    } else {
      setExpandedItems(expandedItems.includes(index) ? [] : [index]);
    }
  };

  return (
    <View {...props} style={style}>
      {data.map((item, index) => (
        <AccordionItem
          key={`accordion-item-${index}`}
          title={item.title}
          content={item.content}
          isExpanded={expandedItems.includes(index)}
          onPress={() => toggleItem(index)}
          titleStyle={titleStyle}
          contentStyle={contentStyle}
          style={itemStyle}
          headerStyle={headerStyle}
          iconStyle={iconStyle}
        />
      ))}
    </View>
  );
};
