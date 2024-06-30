/* eslint-disable react/require-default-props */
import { Text } from 'react-native';

import { Box, Select } from 'native-base';

import { color } from '@/styles/color';
import { _text, hightPercent } from '@/styles/sizes';

export type TSelectionItem = { value: string; label: string };

interface I {
  itens: TSelectionItem[];
  itemSelected: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function Selection({ itens, placeholder, label, itemSelected }: I) {
  return (
    <Box>
      {label && (
        <Text
          style={{
            position: 'absolute',
            top: -8,
            left: '30%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 5,
            zIndex: 10,
            fontSize: _text,
          }}
        >
          {label}
        </Text>
      )}
      <Select
        placeholder={placeholder}
        placeholderTextColor={color.text_color.dark}
        onValueChange={h => itemSelected(h)}
        justifyContent="center"
        alignItems="center"
        _text={{
          color: color.text_color.focus,
          textAlign: 'center',
          marginLeft: '100px',
          fontSize: _text,
        }}
        textAlign="center"
        fontSize={_text}
        defaultValue="Selecione um item"
        rounded="15px"
        h={`${hightPercent('6')}px`}
      >
        {itens.map(h => (
          <Select.Item
            _text={{
              textAlign: 'center',
              alignItems: 'center',
              fontSize: _text,
            }}
            alignItems="center"
            justifyContent="center"
            key={h.value}
            label={h.label}
            value={h.value}
          />
        ))}
      </Select>
    </Box>
  );
}
