import { useAuth } from '@/contexts/auth'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import { AbastecimentoCard } from './AbastecimentoCard'
import { VirtualCard } from './VirtualCard'
import * as S from './styles'

export function Cartao() {
  const { user } = useAuth()
  const modalize = useRef<Modalize>(null)

  const { navigate } = useNavigation()
  return (
    <S.Container>
      {user?.associado ? (
        <VirtualCard />
      ) : (
        <AbastecimentoCard />
      )}
    </S.Container>
  )
}