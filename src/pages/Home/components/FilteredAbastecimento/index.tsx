import { Box, HStack, Image } from 'native-base'
import React from 'react'
import * as S from './styles'

export function FilteredAbastecimento() {
  return (
    <S.Container>
      <S.row>
        <HStack>
          <Image w={8} h={8} alt='bandeira' />
          <Box>
            <S.title>postoName</S.title>
            <S.text>options</S.text>
          </Box>
        </HStack>

        <Box>
          <S.text>data</S.text>
          <S.title>R$</S.title>
        </Box>
      </S.row>
      <S.boxInfo>
        <S.text>abc</S.text>
        <S.text>abc</S.text>
        <S.text>abc</S.text>
        <S.text>abc</S.text>
      </S.boxInfo>

      <S.Line />
    </S.Container>
  )
}