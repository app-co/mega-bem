import React from 'react';
import { FlatList, Modal, TouchableOpacity } from 'react-native';
import {
  NotificationClickEvent,
  OneSignal,
  OSNotification,
} from 'react-native-onesignal';

import { Box, Center, HStack, useToast } from 'native-base';

import { RadioGrup } from '@/components/forms/RadioGrup';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/contexts/auth';
import { UseFatch } from '@/hooks/fetchs';
import { IHistoricoAbastecimento } from '@/hooks/fetchs/types';
import * as mutation from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
import { color } from '@/styles/color';
import { _subtitle, _title } from '@/styles/sizes';

import { FilteredAbastecimento } from '../components/FilteredAbastecimento';
import * as S from './styles';

const fetch = new UseFatch();

type TFilter =
  | 'Todos'
  | 'Ultimos7Dias'
  | 'Ultimos15Dias'
  | 'Ultimos30Dias'
  | 'Ultimos90Dias'
  | 'Placa';

export function HistoricoAbastecimento() {
  const { user } = useAuth();
  const [filter, setFilter] = React.useState<TFilter>('Todos');
  const { isLoading, mutateAsync } = mutation.historicoAbastecimento();
  const toast = useToast();
  const [modal, setModal] = React.useState(false);
  const [placa, setPlaca] = React.useState('');
  const [notification, setNotification] = React.useState<OSNotification>();

  const [history, setHistory] = React.useState<IHistoricoAbastecimento>();

  const getHistory = React.useCallback(async () => {
    try {
      const hi = await mutateAsync({
        Todos: filter === 'Todos',
        Ultimos7Dias: filter === 'Ultimos7Dias',
        Ultimos15Dias: filter === 'Ultimos15Dias',
        Ultimos30Dias: filter === 'Ultimos30Dias',
        Ultimos90Dias: filter === 'Ultimos90Dias',
        CpfCnpj: user!.cpfCnpj,
        Placa: placa || '',
      });

      setHistory(hi);
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Erro',
          description: error.message,
          bg: color.alert,
          placement: 'top',
        });
      }
    }
  }, [filter, placa, user]);

  const touchPlaca = React.useCallback(async (item: string) => {
    setModal(false);
    setFilter('Placa');
    setPlaca(item);
  }, []);

  React.useEffect(() => {
    getHistory();
  }, [filter]);

  const pago = Number(history?.pago).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  React.useEffect(() => {
    function handleClick(event: NotificationClickEvent) {
      setNotification(event.notification);
    }

    OneSignal.Notifications.addEventListener('click', handleClick);

    return () => {
      OneSignal.Notifications.removeEventListener('click', handleClick);
    };
  }, []);

  const isOpen = !!notification?.notificationId;

  const placas = user!.placas.map(h => {
    return {
      text: h,
      value: h,
    };
  });

  return (
    <S.Container>
      <Modal transparent visible={isOpen}>
        <Center flex={1} bg="#353535a1">
          <Center style={{ gap: 8 }} bg="#fff" p={4} rounded={4}>
            <S.title style={{ fontSize: _title + 20 }}>
              {' '}
              {notification?.title}!
            </S.title>
            <S.title
              style={{ textAlign: 'center', width: 270, lineHeight: 30 }}
            >
              {notification?.body}
            </S.title>
            <TouchableOpacity
              style={{
                backgroundColor: color.focus.regular,
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
              onPress={() => setNotification(undefined)}
            >
              <S.title style={{ color: '#fff' }}>FECHAR</S.title>
            </TouchableOpacity>
          </Center>
        </Center>
      </Modal>
      <Modal visible={modal} transparent>
        <Center bg="#5b5b5b8d" flex={1}>
          <Box px={12} rounded="15px" py={3} bg={color.focus.extr_light}>
            <S.title style={{ marginBottom: 10 }}>Selecione uma placa</S.title>
            <RadioGrup selected={h => touchPlaca(h)} radios={placas} />
          </Box>
        </Center>
      </Modal>

      {!history ? (
        <Center>
          <S.title>Você não possui histórico no momento</S.title>
        </Center>
      ) : (
        <Box>
          <Box mt={4} style={{ gap: 25 }}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              rounded="15"
              bg="#CEF4E4"
              p={4}
            >
              <S.title>VALOR ECONOMIZADO</S.title>
              <S.title style={{ fontSize: _subtitle + 2, color: '#178935' }}>
                R${' '}
                {Number(history?.totalEconomizado).toLocaleString('pt-BR') ??
                  'R$ 0,00'}
              </S.title>
            </HStack>

            <HStack alignItems="flex-end" justifyContent="space-between">
              <Box>
                <S.subTitle>TOTAL ABASTECIDO</S.subTitle>
                <S.title
                  style={{
                    fontSize: _subtitle + 2,
                    color: color.text_color.global,
                  }}
                >
                  {Number(history?.litros).toLocaleString('pt-BR') ?? 0} L
                </S.title>
              </Box>

              <S.title
                style={{
                  fontSize: _subtitle + 2,
                  color: color.text_color.light,
                }}
              >
                {pago}
              </S.title>
            </HStack>
          </Box>

          <S.row style={{ marginTop: 30 }}>
            <S.boxFilter
              onPress={() => setFilter('Todos')}
              selected={filter === 'Todos'}
            >
              <S.textSelect selected={filter === 'Todos'}>Tudo</S.textSelect>
            </S.boxFilter>
            <S.boxFilter
              onPress={() => setFilter('Ultimos7Dias')}
              selected={filter === 'Ultimos7Dias'}
            >
              <S.textSelect selected={filter === 'Ultimos7Dias'}>
                Últimos 7 dias
              </S.textSelect>
            </S.boxFilter>
            <S.boxFilter
              onPress={() => setFilter('Ultimos15Dias')}
              selected={filter === 'Ultimos15Dias'}
            >
              <S.textSelect selected={filter === 'Ultimos15Dias'}>
                Últimos 15 dias
              </S.textSelect>
            </S.boxFilter>
          </S.row>

          <S.row>
            {/* {user?.placas.length > 1 && ( */}
            <S.boxFilter
              onPress={() => setModal(true)}
              selected={filter === 'Placa'}
            >
              <S.textSelect selected={filter === 'Placa'}>Placa</S.textSelect>
            </S.boxFilter>
            {/* )} */}
            <S.boxFilter
              onPress={() => setFilter('Ultimos30Dias')}
              selected={filter === 'Ultimos30Dias'}
            >
              <S.textSelect selected={filter === 'Ultimos30Dias'}>
                Últimos 30 dias
              </S.textSelect>
            </S.boxFilter>
            <S.boxFilter
              onPress={() => setFilter('Ultimos90Dias')}
              selected={filter === 'Ultimos90Dias'}
            >
              <S.textSelect selected={filter === 'Ultimos90Dias'}>
                Últimos 90 dias
              </S.textSelect>
            </S.boxFilter>
          </S.row>

          {isLoading ? (
            <Center mt={10} flex={1}>
              <Loading />
            </Center>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingBottom: 300 }}
              showsVerticalScrollIndicator={false}
              data={history.historicosAbastecimentos}
              keyExtractor={h => h.dataAbastecimento}
              renderItem={({ item: h }) => <FilteredAbastecimento item={h} />}
            />
          )}
        </Box>
      )}
    </S.Container>
  );
}
