import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Avatar, HStack, Image } from 'native-base';

import logo from '@/assets/logo.png';
import { useAuth } from '@/contexts/auth';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function HomeHeader() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [nome, sobrenome] = user?.nome.split(' ').map(String);

  return (
    <S.Container>
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <HStack alignItems="center" space={2}>
          <Avatar source={{ uri: user?.fotoUrl }} />
          <S.title>Olá {nome}</S.title>
        </HStack>
      </TouchableOpacity>
      <Image alt="avatar" source={logo} size="9px" h="30px" w="150px" />
    </S.Container>
  );
}
