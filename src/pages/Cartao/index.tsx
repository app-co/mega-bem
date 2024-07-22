/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useRef } from 'react';
import { Modalize } from 'react-native-modalize';

import { Center, useToast, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { Input } from '@/components/forms/Input';
import { InputPlaca } from '@/components/forms/Input-placa';
import { Selection } from '@/components/forms/Selection';
import { useAuth } from '@/contexts/auth';
import { IVirtualCard } from '@/hooks/fetchs/types';
import { gerarVirtualCard } from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
import { _text } from '@/styles/sizes';
import { Mask } from '@/utils/mask';
import { useFocusEffect } from '@react-navigation/native';

import { VirtualCard } from './CardModalize';
import * as S from './styles';

export function Cartao() {
  const { user } = useAuth();
  const modalizeRef = useRef<Modalize>(null);
  const { mutateAsync, isLoading } = gerarVirtualCard();

  const umaPlaca = user!.placas.length === 1 ? user!.placas[0] : '';
  const [selectedPlaca, setPlacaSelected] = React.useState(umaPlaca);
  const [placa, setPlaca] = React.useState();
  const [getPlaca, setGetPlaca] = React.useState<IVirtualCard>();
  const [item, setItem] = React.useState<IVirtualCard>();
  const [cpf, setCpf] = React.useState(umaPlaca ? user!.cpfCnpj : '');

  const toast = useToast();

  const mask = new Mask();

  const get = React.useCallback(
    async (placa: string) => {
      const dt = {
        Cpf: cpf || user!.cpfCnpj,
        Placa: selectedPlaca,
        AssociadoId: null,
      };

      try {
        const data = await mutateAsync(dt);
        setItem(data);
      } catch (error) {
        if (error instanceof AppError) {
          toast.show({
            title: 'Alerta!',
            description: error.message,
            bg: '#875919',
            placement: 'top',
          });
        }
      }
    },
    [user, cpf, mutateAsync, selectedPlaca],
  );

  function openModal() {
    if (umaPlaca) {
      get(umaPlaca);
    } else {
      modalizeRef.current?.open();
    }
  }

  useFocusEffect(
    useCallback(() => {
      modalizeRef.current?.close();

      if (umaPlaca) {
        get(umaPlaca);
      }

      if (user?.placas.length !== 0) {
        setTimeout(() => {
          openModal();
        }, 500);
      }
    }, [umaPlaca]),
  );

  const placas = user!.placas.map(h => {
    return {
      label: h,
      value: h,
    };
  });

  return (
    <S.Container>
      <Modalize adjustToContentHeight ref={modalizeRef}>
        <S.content>
          {user!.placas!.length > 1 ? (
            <VStack mt={8} space={2}>
              <S.text>Selecione uma placa</S.text>
              <Selection
                label="Placa do Veículo"
                itens={placas}
                itemSelected={h => setPlacaSelected(h)}
                placeholder="Selecione aqui sua placa"
              />
            </VStack>
          ) : (
            <>
              <InputPlaca
                value={mask.placa(selectedPlaca)}
                onChangeText={setPlacaSelected}
                autoCapitalize="characters"
                label="Placa do Veículo"
              />

              <Input
                value={mask.formatCPFOrCNPJ(cpf)}
                onChangeText={setCpf}
                label="CPF"
                placeholder="Digite seu CPF"
              />
            </>
          )}

          <Button
            onPress={() => {
              get(selectedPlaca);
              modalizeRef.current?.close();
            }}
            title="GERAR CARTÃO VIRTUAL"
          />
        </S.content>
      </Modalize>
      <Center p={4}>
        <S.textBold style={{ fontSize: _text }}>ANTES DE ABASTECER,</S.textBold>
        <S.text>
          Informe ao <S.textBold>frentista</S.textBold> o código gerado em seu
          cartão virtual
        </S.text>
      </Center>

      <VirtualCard pres={openModal} load={isLoading} item={item} />
      {/* <CardModalize modalizeRef={modalizeRef} item={getPlaca} placa={placa} /> */}
      {/* <AbastecimentoCard
        setCpf={h => setCpf(h)}
        setPlaca={h => {
          console.log(h);
        }}
      /> */}
    </S.Container>
  );
}
function mutateAsync(dt: { Cpf: string; Placa: string; AssociadoId: null }) {
  throw new Error('Function not implemented.');
}
