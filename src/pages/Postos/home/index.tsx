import { Loading } from '@/components/Loading'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { Box } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { useQuery } from 'react-query'
import { CardDetails } from '../components/CardDetails'
import * as S from './styles'

const fetch = new UseFatch()
export function Postos() {
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['postos'],
    queryFn: async () => await fetch.getPostos({
      Latitude: 16.745524,
      Longitude: 49.197725
    }),
  })


  if (isLoading) return <Loading />
  return (
    <S.Container>
      <Box style={{ gap: 8 }} >
        <FlatList
          data={data}
          keyExtractor={h => h.id}
          renderItem={({ item: h }) => (
            <CardDetails item={h} />
          )}
        />
      </Box>
    </S.Container>
  )
}