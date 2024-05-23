import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { color } from '@/styles/color'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { Box, Circle, HStack } from 'native-base'
import React from 'react'
import { useQuery } from 'react-query'
import * as S from './styles'

type TStatus = 'AGUARDANDO' | 'ATRASADO' | 'PAGO'

interface IStatus {
  status: TStatus;
}

const statusColor: any = {
  AGUARDANDO: color.focus.ligh,
  ATRASADO: '#ff7f7f',
  PAGO: '#71ffb4',
}

const statusIco: any = {
  AGUARDANDO: 'clock',
  ATRASADO: 'calendar',
  PAGO: 'check',
}

const fetch = new UseFatch()

export function HistoricoPayment() {
  const { user } = useAuth()
  const [status, setStatus] = React.useState<TStatus>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['historico-pagamento'],
    queryFn: async () => await fetch.getHistoricoPagamento({ AssociadoId: user!.associadoId }),
  })

  return (
    <S.Container>
      <S.boxInput>
        <Feather name='search' size={20} />
        <S.input cursorColor={''} />
      </S.boxInput>

      <Box style={{ gap: 15 }} mt='6' >
        <S.row>
          <HStack space={4} alignItems={'center'} >
            <Circle p={3} bg={'#E5E7EB'} >
              <FontAwesome5 size={23} name='calendar' color={color.focus.ligh} />
            </Circle>

            <Box>
              <S.title>Fatura Setembro</S.title>
              <S.text>vence em 22/10</S.text>
            </Box>
          </HStack>

          <S.status status='PAGO' >
            <FontAwesome5 name={statusIco['ATRAZADO']} />
            <S.textStatus status='PAGO' >PAGO</S.textStatus>
          </S.status>
        </S.row>

        <S.line />

        <S.row>
          <HStack space={4} alignItems={'center'} >
            <Circle p={3} bg={'#E5E7EB'} >
              <FontAwesome5 size={23} name='calendar' color={color.focus.ligh} />
            </Circle>

            <Box>
              <S.title>Fatura Setembro</S.title>
              <S.text>pa</S.text>
            </Box>
          </HStack>

          <S.status status='PAGO' >
            <FontAwesome5 name={statusIco['ATRAZADO']} />
            <S.textStatus status='PAGO' >PAGO</S.textStatus>
          </S.status>
        </S.row>

        <S.line />

        <S.row>
          <HStack space={4} alignItems={'center'} >
            <Circle p={3} bg={'#E5E7EB'} >
              <FontAwesome5 size={23} name='calendar' color={color.focus.ligh} />
            </Circle>

            <Box>
              <S.title>pa</S.title>
              <S.text>pa</S.text>
            </Box>
          </HStack>

          <S.status status='PAGO' >
            <FontAwesome5 name={statusIco['ATRAZADO']} />
            <S.textStatus status='PAGO' >PAGO</S.textStatus>
          </S.status>
        </S.row>

        <S.line />

      </Box>

    </S.Container>
  )
}