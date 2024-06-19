/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';


import { color } from '@/styles/color';
import { HStack } from 'native-base';
import * as S from './styles';

interface IProps extends TouchableOpacityProps {
  title?: string;
  load?: boolean;
  styleType?: 'light' | 'dark' | 'border' | 'medium';
  bg_color?: string;
  txt_color?: string;
  icon?: ReactNode
}

export function Button({
  title = 'SALVAR',
  load,
  styleType = 'light',
  icon,
  ...rest
}: IProps) {
  return (
    <S.Container
      styleType={styleType}
      disabled={load}
      {...rest}
    >
      {load ? (
        <ActivityIndicator color={color.focus.ligh} size={36} />
      ) : (
        <HStack space={2} alignItems={'center'}>
          {icon}
          <S.title styleType={styleType}>
            {title}
          </S.title>
        </HStack>
      )}
    </S.Container>
  );
}
