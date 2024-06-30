import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { format } from 'date-fns';
import { Box, Circle, HStack } from 'native-base';

import { useAuth } from '@/contexts/auth';
import { UseFatch } from '@/hooks/fetchs';
import { color } from '@/styles/color';

import * as S from './styles';

type TStatus = 'AGUARDANDO' | 'ATRASADO' | 'PAGO';

interface IStatus {
  status: TStatus;
}

const statusColor: any = {
  1: color.focus.ligh,
  2: '#ff7f7f',
  0: '#71ffb4',
};

const statusIco: any = {
  1: 'clock',
  2: 'calendar',
  0: 'check',
};

const fetch = new UseFatch();

export function HistoricoPayment() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['historico-pagamento'],
    queryFn: async () =>
      fetch.getHistoricoPagamento({ AssociadoId: user!.associadoId! }),
  });

  const status: Record<number, string> = {
    0: 'Pago',
    1: 'Aguardando',
    2: 'Atrasado',
  };

  return (
    <S.Container>
      <S.boxInput>
        <Feather name="search" size={20} />
        <S.input cursorColor="" />
      </S.boxInput>

      <FlatList
        data={data}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <Box style={{ gap: 15 }} mt="6">
            <S.row>
              <HStack space={4} alignItems="center">
                <Circle p={3} bg="#E5E7EB">
                  <FontAwesome5
                    size={23}
                    name="calendar"
                    color={color.focus.ligh}
                  />
                </Circle>

                <Box>
                  <S.title>{h.mesReferencia}</S.title>
                  <S.text>
                    Vence em {format(new Date(h.dataVencimento), 'dd/MM')}
                  </S.text>
                </Box>
              </HStack>

              <S.status status={h.statusPagamento}>
                <FontAwesome5 name={statusIco[h.statusPagamento]} />
                <S.textStatus status={h.statusPagamento}>
                  {status[h.statusPagamento]}
                </S.textStatus>
              </S.status>
            </S.row>

            <S.line />
          </Box>
        )}
      />
    </S.Container>
  );
}
