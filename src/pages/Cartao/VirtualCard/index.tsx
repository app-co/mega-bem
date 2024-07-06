import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, Center, HStack, VStack, useToast } from 'native-base';

import { WalletBarSvg } from '@/assets/svgs/wallet-bar';
import { Loading } from '@/components/Loading';
import { Selection } from '@/components/forms/Selection';
import { useAuth } from '@/contexts/auth';
import { IVirtualCard } from '@/hooks/fetchs/types';
import * as mutation from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
import { color } from '@/styles/color';
import { _title, hightPercent } from '@/styles/sizes';
import { useFocusEffect } from '@react-navigation/native';

import * as S from './styles';

export function VirtualCard() {
  const { user } = useAuth();
  const [placaSelected, setPlacaSelected] = React.useState<any>();
  const [getPlaca, setGetPlaca] = React.useState<IVirtualCard>();
  const { mutateAsync, isLoading } = mutation.gerarVirtualCard();

  const toast = useToast();

  const placas =
    user?.placas && user.placas.length > 1
      ? user.placas.map(h => {
        return {
          label: h,
          value: h,
        };
      })
      : null;

  const get = React.useCallback(async () => {
    const dt = {
      Cpf: user!.cpfCnpj,
      Placa: placas ? placaSelected : user?.placas[0],
      AssociadoId: null,
    };

    try {
      const data = await mutateAsync(dt);
      setGetPlaca(data);
      setPlacaSelected(placas ? placaSelected : user?.placas[0]);
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
  }, [placaSelected]);

  React.useEffect(() => {
    get();
  }, [placaSelected]);

  useFocusEffect(
    useCallback(() => {
      get();
    }, []),
  );

  if (isLoading) return <Loading />;

  const [nome, sobrenome] = user!.nome.split(' ').map(String);
  return (
    <S.Container>
      <S.body>
        <Box>
          <S.title style={{ textAlign: 'center', marginBottom: 20 }}>
            Cartão Virtual
          </S.title>

          <S.text>
            Informe ao <S.textBold>frentista</S.textBold> o código gerado em seu
            cartão virtual <S.textBold>antes do abastecimento.</S.textBold>
          </S.text>

          {placas && (
            <VStack mt={8} space={2}>
              <S.text>Selecione uma placa</S.text>
              <Selection
                itens={placas}
                itemSelected={h => setPlacaSelected(h)}
              />
            </VStack>
          )}
        </Box>

        <Box>
          {getPlaca ? (
            <S.card
              colors={[color.focus.regular, '#3134a5', color.focus.regular]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* <HStack mb={6} justifyContent="space-between">
                <Box flex={1}>
                  <Logo width={100} height={100} />
                </Box>
                <S.title style={{ color: '#fff' }}>
                  Placa: {placaSelected}
                </S.title>
              </HStack> */}

              <S.cod>{getPlaca.codCartao}</S.cod>
              {/* <LogoIco /> */}

              <HStack
                alignItems="flex-end"
                justifyContent="space-between"
                w="full"
              >
                {/* <Box>
                  <S.text style={{ color: '#fff' }}>
                    VÁLIDO ATÉ {getPlaca.dataValidade}
                  </S.text>
                  <S.textBold style={{ color: '#fff' }}>
                    {nome} {sobrenome}
                  </S.textBold>
                </Box> */}

                {/* <S.text style={{ color: '#fff' }}>{getPlaca.nomeGrupo}</S.text> */}
              </HStack>
            </S.card>
          ) : (
            <TouchableOpacity onPress={get}>
              <Center
                bg={color.focus.regular}
                h={hightPercent('25')}
                rounded="15px"
              >
                <WalletBarSvg width={80} height={83} fill="#fff" />
                <S.title
                  style={{
                    color: '#fff',
                    fontSize: _title,
                    marginTop: 20,
                    textAlign: 'center',
                  }}
                >
                  GERAR CARTÃO DE ABASTECIMENTO
                </S.title>
              </Center>
            </TouchableOpacity>
          )}
        </Box>
      </S.body>
    </S.Container>
  );
}
