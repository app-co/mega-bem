import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as S from './styles'

export function HeaderDetails() {
  const { goBack } = useNavigation()
  return (
    <S.Container>
      <TouchableOpacity onPress={() => goBack()} style={{ padding: 5 }} >
        <AntDesign size={30} name='arrowleft' color={'#fff'} />

      </TouchableOpacity>
      <S.title>HeaderDetails</S.title>
    </S.Container>
  )
}