/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/auth';

export const TextWithLimit: React.FC<{
  style?: any;
  width?: number;
  text: string;
  characterLimit: number;
  showMore?: boolean;
}> = ({ style, text, characterLimit, width = 195, showMore = true }) => {
  const { user } = useAuth();

  const [showAll, setShowAll] = useState(false);

  const displayText = showAll ? text : text.slice(0, characterLimit);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.text, style]}>
        {displayText}
        {text.length > characterLimit && showMore && <Text>...</Text>}
        {/* {text.length > characterLimit && !showMore && ' ...'} */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 195,
  },
  text: {
    flex: 1,
    fontSize: 14,
    letterSpacing: 0.56,
  },
});
