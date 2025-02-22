import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';

import { getHours } from 'date-fns';
import { Box, Center, HStack, Image } from 'native-base';

import { Button } from '@/components/forms/Button';
import { IGetPostos } from '@/hooks/fetchs/types';
import { color } from '@/styles/color';
import { _text, widtPercent } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface I {
  item: IGetPostos;
}
export function CardDetails({ item }: I) {
  const [mor, setMor] = React.useState(2);
  const itens = item.precoCombustivel.slice(0, mor);

  const { navigate, reset } = useNavigation();

  const hour = getHours(new Date(Date.now()));
  const [start_hour, s_] = item.horarioAbertura.split(':').map(Number);
  const [end_hour, e_] = item.horarioFechamento.split(':').map(Number);
  const termino = end_hour === 0 ? 24 : end_hour;
  const status = hour >= start_hour && hour <= termino ? 'ABERTO' : 'FECHADO';

  const details = itens.length > 2;

  function navigation() {
    navigate('cards');
  }

  return (
    <S.Container onPress={() => setMor(2)}>
      <S.header>
        <HStack flex={1} alignItems="center" space={2}>
          <Image
            size="sm"
            alt="image posto"
            source={{ uri: item.fotoBandeiraPosto }}
          />

          <Box>
            <S.title style={{ width: widtPercent('20') }}>
              {item.postoNome}
            </S.title>
            <Center
              bg={status === 'ABERTO' ? 'green.200' : 'red.500'}
              px={2}
              w="90px"
              rounded="35px"
              h="20px"
            >
              <S.textStatus
                style={{
                  color: status === 'ABERTO' ? color.focus.dark : '#650202',
                }}
              >
                {status}
              </S.textStatus>
            </Center>
          </Box>
        </HStack>

        <HStack alignItems="center" space={4}>
          <Center>
            <FontAwesome5
              size={20}
              name="map-marker-alt"
              color={color.text_color.light}
            />
            <S.title style={{ marginTop: 5, color: color.text_color.light }}>
              {item.distancia.toLocaleString('pt-BR')} km
            </S.title>
          </Center>
        </HStack>
      </S.header>

      <S.body>
        <HStack mb={4} space={4}>
          <Box flex={1}>
            <S.text>COMBUSTÍVEL</S.text>
          </Box>

          <Box>
            <S.text>POSTO (R$)</S.text>
          </Box>
          <Box>
            <S.text>MEGA BEM (R$)</S.text>
          </Box>
        </HStack>

        {itens.map(h => (
          <HStack key={h.titulo} alignItems="center" space={4} w="full">
            <Box flex={1}>
              <S.text style={{ fontFamily: 'semi_bold', fontSize: _text - 1 }}>
                {h.titulo}
              </S.text>
            </Box>

            <Box>
              <S.text
                style={{
                  textDecorationLine: 'line-through',
                  fontFamily: 'trin',
                  fontSize: _text,
                }}
              >
                {Number(h.precoBomba).toLocaleString('pt-BR')}
              </S.text>
            </Box>
            <Box alignItems="flex-end" w="95px">
              <Center bg={color.focus.regular} w="70px" rounded={8} p={1}>
                <S.text
                  style={{
                    color: '#fff',
                    fontFamily: 'bold',
                    fontSize: _text - 1,
                  }}
                >
                  {Number(h.precoClubGas).toLocaleString('pt-BR')}
                </S.text>
              </Center>
            </Box>
          </HStack>
        ))}

        {item.precoCombustivel.length <= 2 ? (
          <Button
            onPress={() => {
              navigate('details', {
                idPosto: item.id,
                km: item.distancia,
                placa: '',
              });
            }}
            style={{ backgroundColor: color.buttonMediun.bg }}
            title="VER DETALHES"
          />
        ) : (
          <Button
            onPress={() => {
              if (mor === 2) {
                setMor(item.precoCombustivel.length);
              } else {
                navigate('details', {
                  idPosto: item.id,
                  km: item.distancia,
                  placa: '',
                });
              }
            }}
            style={{ backgroundColor: color.buttonMediun.bg }}
            title={mor === 2 ? 'EXIBIR MAIS' : 'VER DETALHES'}
          />
        )}
      </S.body>

      {mor > 2 && (
        <Box mt={4}>
          <Button
            onPress={navigation}
            styleType="dark"
            title="GERAR CARTÃO ABASTECIMENTO"
          />
        </Box>
      )}
    </S.Container>
  );
}
