import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as S from './styles'

interface I {
  goback: () => void
}

export function HeaderDetails({ goback }: I) {
  const { goBack } = useNavigation()
  return (
    <S.Container>
      <TouchableOpacity onPress={goback} style={{ padding: 5 }} >
        <AntDesign size={30} name='arrowleft' color={'#f1f1f1'} />

      </TouchableOpacity>
      <S.title>Detalhes do Posto</S.title>
    </S.Container>
  )
}