import { HomeHeader } from '@/components/HEADERS/HomeHeader'
import { PostosModalize } from '@/components/modals/modalSheet/PostosModalize'
import { UseFatch } from '@/hooks/fetchs'
import React, { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import { Servicos } from './components/Servicos'
import * as S from './styles'

const fetch = new UseFatch()
export function Home() {
  const modalizeRef = useRef<Modalize>(null)

  return (

    <S.Container>

      <PostosModalize modalize={modalizeRef} />
      <HomeHeader />
      <Servicos modalize={() => modalizeRef.current?.open()} />
    </S.Container>
  )
}