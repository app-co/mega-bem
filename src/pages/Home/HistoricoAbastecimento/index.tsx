import { Loading } from '@/components/Loading'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { IHistoricoAbastecimento } from '@/hooks/fetchs/types'
import * as mutation from '@/hooks/mutations'
import { color } from '@/styles/color'
import { _subtitle } from '@/styles/sizes'
import { Box, HStack } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { FilteredAbastecimento } from '../components/FilteredAbastecimento'
import * as S from './styles'
const fetch = new UseFatch()

type TFilter =
  'Todos' |
  'Ultimos7Dias' |
  'Ultimos15Dias' |
  'Ultimos30Dias' |
  'Ultimos90Dias' |
  'Placa'

export function HistoricoAbastecimento() {
  const { user } = useAuth()
  const [filter, setFilter] = React.useState<TFilter>('Todos')
  const { isLoading, mutateAsync } = mutation.historicoAbastecimento()

  const [history, setHistory] = React.useState<IHistoricoAbastecimento>()

  const getHistory = React.useCallback(async () => {
    const hi = await mutateAsync({
      Todos: filter === 'Todos',
      Ultimos7Dias: filter === 'Ultimos7Dias',
      Ultimos15Dias: filter === 'Ultimos15Dias',
      Ultimos30Dias: filter === 'Ultimos30Dias',
      Ultimos90Dias: filter === 'Ultimos90Dias',
      CpfCnpj: user!.cpfCnpj
    })
    setHistory(hi)

  }, [filter])



  React.useEffect(() => {
    getHistory()
  }, [filter])


  if (isLoading) return <Loading />

  const pago = Number(history?.result[0].pago).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <S.Container>

      <Box mt={4} style={{ gap: 25 }} >
        <HStack justifyContent={'space-between'} alignItems={'center'} rounded={'15'} bg={'#CEF4E4'} p={4} >
          <S.title>VALOR ECONOMIZADO</S.title>
          <S.title style={{ fontSize: _subtitle + 2, color: '#178935' }} >R$ {history?.result[0].totalEconomizado}</S.title>
        </HStack>

        <HStack alignItems={'flex-end'} justifyContent={'space-between'} >
          <Box>
            <S.subTitle>TOTL ABASTECIDO</S.subTitle>
            <S.title style={{ fontSize: _subtitle + 2, color: color.text_color.global }} >{history?.result[0].litros} L</S.title>
          </Box>

          <S.title style={{ fontSize: _subtitle + 2, color: color.text_color.light }} >{pago}</S.title>
        </HStack>

      </Box>

      <S.row style={{ marginTop: 30 }} >
        <S.boxFilter onPress={() => setFilter('Todos')} selected={filter === 'Todos'} >
          <S.textSelect selected={filter === 'Todos'} >Tudo</S.textSelect>
        </S.boxFilter>
        <S.boxFilter onPress={() => setFilter('Ultimos7Dias')} selected={filter === 'Ultimos7Dias'} >
          <S.textSelect selected={filter === 'Ultimos7Dias'} >Últimos 7 dias</S.textSelect>
        </S.boxFilter>
        <S.boxFilter onPress={() => setFilter('Ultimos15Dias')} selected={filter === 'Ultimos15Dias'} >
          <S.textSelect selected={filter === 'Ultimos15Dias'} >Últimos 15 dias</S.textSelect>
        </S.boxFilter>
      </S.row>

      <S.row>
        <S.boxFilter onPress={() => setFilter('Placa')} selected={filter === 'Placa'} >
          <S.textSelect selected={filter === 'Placa'} >Placa</S.textSelect>
        </S.boxFilter>
        <S.boxFilter onPress={() => setFilter('Ultimos30Dias')} selected={filter === 'Ultimos30Dias'} >
          <S.textSelect selected={filter === 'Ultimos30Dias'} >Últimos 30 dias</S.textSelect>
        </S.boxFilter>
        <S.boxFilter onPress={() => setFilter('Ultimos90Dias')} selected={filter === 'Ultimos90Dias'} >
          <S.textSelect selected={filter === 'Ultimos90Dias'} >Últimos 90 dias</S.textSelect>
        </S.boxFilter>
      </S.row>

      <FlatList
        data={history?.result[0].historicosAbastecimentos}
        keyExtractor={h => h.dataAbastecimento}
        renderItem={({ item: h }) => (
          <FilteredAbastecimento item={h} />
        )}
      />

    </S.Container>
  )
}