import { Avatar, HStack, Image } from 'native-base'
import React from 'react'
import * as S from './styles'

import logo from '@/assets/logo.png'

export function HomeHeader() {
  return (
    <S.Container>
      <HStack alignItems={'center'} space={2} >
        <Avatar />
        <S.title>Olá william</S.title>
      </HStack>
      <Image alt="avatar" source={logo} size='9px' h='30px' w={'150px'} />
    </S.Container>
  )
}