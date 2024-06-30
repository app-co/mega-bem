import React, { useCallback, useRef } from 'react';
import { Modalize } from 'react-native-modalize';

import { useToast } from 'native-base';

import { Loading } from '@/components/Loading';
import { CardModalize } from '@/components/modals/modalSheet/CardModalize';
import { useAuth } from '@/contexts/auth';
import { IVirtualCard } from '@/hooks/fetchs/types';
import * as mutation from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
import { useFocusEffect } from '@react-navigation/native';

import { AbastecimentoCard } from './AbastecimentoCard';
import * as S from './styles';

export function Cartao() {
  const { user } = useAuth();
  const modalizeRef = useRef<Modalize>(null);

  const [placaSelected, setPlacaSelected] = React.useState<any>();
  const [placa, setPlaca] = React.useState('');
  const [getPlaca, setGetPlaca] = React.useState<IVirtualCard>();
  const { mutateAsync, isLoading } = mutation.gerarVirtualCard();
  const [cpf, setCpf] = React.useState('');

  const toast = useToast();

  const get = React.useCallback(
    async (placa: string) => {
      const Placa = user?.placas.length === 1 ? user.placas[0] : placa;
      if (!Placa) {
        toast.show({
          title: 'Alerta!',
          description: 'Selecione ou digite sua placa',
          bg: '#df9328',
          placement: 'top',
        });
        return;
      }

      const dt = {
        Cpf: cpf || user!.cpfCnpj,
        Placa: Placa.replace('-', ''),
        AssociadoId: null,
      };

      try {
        const data = await mutateAsync(dt);
        setGetPlaca(data);
        setPlaca(placaSelected ?? user?.placas[0]);
        modalizeRef.current?.open();
      } catch (error) {
        if (error instanceof AppError) {
          toast.show({
            title: 'Alerta!',
            description: error.message,
            bg: '#df9328',
            placement: 'top',
          });
        }
      }
    },
    [user, cpf, mutateAsync, placaSelected, toast],
  );

  useFocusEffect(
    useCallback(() => {
      modalizeRef.current?.close();

      if (user?.placas.length === 1) {
        get(user.placas[0]);
      }
    }, [user]),
  );

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <CardModalize modalizeRef={modalizeRef} item={getPlaca} placa={placa} />
      <AbastecimentoCard
        setCpf={h => setCpf(h)}
        setPlaca={h => {
          get(h);
        }}
      />
    </S.Container>
  );
}
