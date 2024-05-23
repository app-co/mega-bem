import { Button } from '@/components/forms/Button'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import * as S from './styles'

export function Cartao() {
  const modalize = useRef<Modalize>(null)

  const { navigate } = useNavigation()
  return (
    <S.Container>
      <Button title='Gerar cartão virtual' onPress={() => navigate('virtualCard')} />
      <Button styleType='dark' title='Cartão de abastecimento' onPress={() => navigate('abastecimentoCard')} />
    </S.Container>
  )
}