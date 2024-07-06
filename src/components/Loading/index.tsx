import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Center, Skeleton, VStack } from 'native-base';

import * as S from './styles';

export function Loading() {
  return (
    <S.Container>
      <Center flex={1}>
        <VStack
          w="90%"
          maxW="400"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: 'gray.800',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        >
          <Skeleton h="40px" />
          <Skeleton.Text px="4" />
          <Skeleton px="4" my="4" rounded="md" startColor="gray.300" />

          <Skeleton h="40px" />
          <Skeleton.Text px="4" />
          <Skeleton px="4" my="4" rounded="md" startColor="gray.300" />
        </VStack>

        <ActivityIndicator />
        <S.title>Atualizando seus dados ...</S.title>
      </Center>
    </S.Container>
  );
}
