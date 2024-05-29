import { useAuth } from '@/contexts/auth'
import { IVirtualCard } from '@/hooks/fetchs/types'
import React, { useCallback, useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import { AbastecimentoCard } from './AbastecimentoCard'
import * as S from './styles'

import { Loading } from '@/components/Loading'
import { CardModalize } from '@/components/modals/modalSheet/CardModalize'
import * as mutation from '@/hooks/mutations'
import { AppError } from '@/services/AppError'
import { useFocusEffect } from '@react-navigation/native'
import { useToast } from 'native-base'

export function Cartao() {
  const { user } = useAuth()
  const modalizeRef = useRef<Modalize>(null)

  const [placaSelected, setPlacaSelected] = React.useState<any>()
  const [getPlaca, setGetPlaca] = React.useState<IVirtualCard>()
  const { mutateAsync, isLoading } = mutation.gerarVirtualCard()
  const [cpf, setCpf] = React.useState('')

  const toast = useToast()

  const get = React.useCallback(async () => {
    const dt = {
      Cpf: cpf ? cpf : user!.cpfCnpj,
      Placa: placaSelected ? placaSelected : user?.placas[0],
      AssociadoId: null
    }

    try {
      const data = await mutateAsync(dt)
      setGetPlaca(data)
      setPlacaSelected(placaSelected ? placaSelected : user?.placas[0])
      modalizeRef.current?.open()

    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Alerta!',
          description: error.message,
          bg: "#df9328",
          placement: 'top'
        })
      }
    }
  }, [placaSelected])

  useFocusEffect(useCallback(() => {
    modalizeRef.current?.close()
    if (user?.placas.length === 1) {
      get()
    }
  }, []))

  if (isLoading) return <Loading />


  return (
    <S.Container>
      {/* {user?.associado ? (
        <VirtualCard />
      ) : (
        <AbastecimentoCard />
      )} */}

      <CardModalize modalizeRef={modalizeRef} item={getPlaca} placa={placaSelected} />
      <AbastecimentoCard pres={get} setCpf={h => setCpf(h)} setPlaca={h => setPlacaSelected(h)} />
    </S.Container>
  )
}