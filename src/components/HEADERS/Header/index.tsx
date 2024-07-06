/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Center } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function Header(props: any) {
  const nav = useNavigation();

  return (
    <S.Container>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#696969" />
      </TouchableOpacity>

      <Center>
        <S.title>{props.options?.title}</S.title>
      </Center>
    </S.Container>
  );
}
