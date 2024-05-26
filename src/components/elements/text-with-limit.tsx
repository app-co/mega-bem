import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import '@/utils/translations/i18n';

import { useAuth } from '@/contexts/auth';

export const TextWithLimit: React.FC<{
  style?: any;
  text: string;
  characterLimit: number;
  showMore?: boolean;
}> = ({ style, text, characterLimit, showMore = true }) => {

  const { user } = useAuth();

  const [showAll, setShowAll] = useState(false);

  const displayText = showAll ? text : text.slice(0, characterLimit);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>
        {displayText}
        {text.length > characterLimit && showMore && (
          <Text
            onPress={toggleShowAll}
          >
            {showAll
              ? 'menos'
              : 'mais'}
          </Text>
        )}
        {text.length > characterLimit && !showMore && '...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 14,
    letterSpacing: 0.56,
  }
});
