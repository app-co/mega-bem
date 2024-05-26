import { Avatar, HStack, Image } from 'native-base'
import React from 'react'
import * as S from './styles'

import logo from '@/assets/logo.png'
import { useAuth } from '@/contexts/auth'

export function HomeHeader() {
  const { user } = useAuth()

  const [nome, sobrenome] = user?.nome.split(' ').map(String)

  return (
    <S.Container>
      <HStack alignItems={'center'} space={2} >
        <Avatar source={{ uri: user?.fotoUrl }} />
        <S.title>Olá, {nome}</S.title>
      </HStack>
      <Image alt="avatar" source={logo} size='9px' h='30px' w={'150px'} />
    </S.Container>
  )
}