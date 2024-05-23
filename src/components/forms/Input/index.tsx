/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Box } from 'native-base';

import { font } from '@/styles/fonts';

import { color } from '@/styles/color';
import * as S from './styles';

export interface TypeInput extends TextInputProps {
  icon?: React.ComponentProps<typeof Feather>['name'];
  label: string;
  error?: any;
}

export function Input({ value, error, label, icon, ...rest }: TypeInput) {
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
        <S.title style={{ color: '#ff0000', fontFamily: font.bold }}>
          {error}
        </S.title>
      ) : (
        <S.title>{label}</S.title>
      )}
      <S.Container focus={isFocused} filed={isFiled} error={error} >
        <S.input
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          cursorColor={color.focus.dark}
          {...rest}
        />
        {/* 
        {icon && (
          <S.boxIcon>
            <Feather
              name={icon}
              size={25}
              color={isFiled || isFocused ? cor.focus.a : cor.bgcolor}
            />
          </S.boxIcon>
        )} */}
      </S.Container>
    </Box>
  );
}
