import { LogoIco } from '@/assets/svgs/logo-ico'
import { color } from '@/styles/color'
import { Box, HStack } from 'native-base'
import React from 'react'
import * as S from './styles'

export function VirtualCard() {
  return (
    <S.Container>

      <S.body>
        <S.title style={{ textAlign: 'center', marginBottom: 20 }} >Gerar Cartão Virtual</S.title>

        <S.text>
          Informe ao <S.textBold>frentista</S.textBold> o código gerado em seu
          cartão virtual <S.textBold>antes do abastecimento.</S.textBold>
        </S.text>

        <S.card
          colors={[color.focus.regular, '#4a4eba', color.focus.regular]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >

          <HStack justifyContent={'space-between'}>
            <S.text style={{ flex: 1 }}>123456</S.text>
            <S.title style={{ color: '#fff' }} >123456</S.title>
          </HStack>

          <S.cod>F351</S.cod>
          <LogoIco />

          <HStack justifyContent={'space-between'} w={'full'} >
            <Box>
              <S.text style={{ color: '#fff' }} >VÁLIDO ATÉ 14/02/2/24</S.text>
              <S.textBold style={{ color: '#fff' }} >123456</S.textBold>
            </Box>

            <S.title>Nome</S.title>
          </HStack>
        </S.card>

      </S.body>
    </S.Container >
  )
}