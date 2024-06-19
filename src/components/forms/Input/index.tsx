/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';

import { Box } from 'native-base';

import { color } from '@/styles/color';
import { font } from '@/styles/fonts';

import * as S from './styles';

export interface TypeInput extends TextInputProps {
  icon?: React.ComponentProps<typeof Feather>['name'];
  label: string;
  error?: any;
  presIco?: () => void;
}

export function Input({
  value,
  presIco,
  error,
  label,
  icon,
  ...rest
}: TypeInput) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFiled, setIsFiled] = React.useState(false);

  const handleFocus = React.useCallback(async () => {
    setIsFocused(true);
  }, []);

  const handleBlur = React.useCallback(async () => {
    setIsFocused(false);
    setIsFiled(!!value);
  }, [value]);

  return (
    <Box w="full">
      {error ? (
        <S.title style={{ color: '#ff0000', fontFamily: font.light }}>
          {error}
        </S.title>
      ) : (
        <S.title>{label}</S.title>
      )}
      <S.Container focus={isFocused} filed={isFiled} error={error}>
        <S.input
          isFilled={isFiled}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          cursorColor={color.focus.dark}
          {...rest}
        />

        {icon && (
          <S.boxIcon onPress={presIco}>
            <Entypo
              name={icon}
              size={20}
              color={
                isFiled || isFocused ? color.focus.regular : color.focus.ligh
              }
            />
          </S.boxIcon>
        )}
      </S.Container>
    </Box>
  );
}
