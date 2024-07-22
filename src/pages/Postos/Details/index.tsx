import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';

import * as Linking from 'expo-linking';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { getHours } from 'date-fns';
import { Box, Center, Circle, HStack, Image } from 'native-base';

import { CarLightSvg } from '@/assets/svgs/Car copy';
import { Button } from '@/components/forms/Button';
import { HeaderDetails } from '@/components/HEADERS/HeaderDetails';
import { Loading } from '@/components/Loading';
import { UseFatch } from '@/hooks/fetchs';
import { color } from '@/styles/color';
import { _text, hightPercent, widtPercent } from '@/styles/sizes';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as S from './styles';

const fetch = new UseFatch();
export function Details() {
  const { idPosto, km, placa } = useRoute().params as {
    idPosto: string;
    km: number;
    placa: string;
  };
  const { navigate, goBack } = useNavigation();

  const itens = Array.from({ length: 6 });
  const { data, isLoading } = useQuery({
    queryKey: ['posto-details'],
    queryFn: async () => fetch.getInfoPosto({ idPosto }),
  });
  const obs = React.useMemo(() => {
    const ordem: { [key: string]: number } = {
      Primeiro: 0,
      Segundo: 1,
      Terceiro: 2,
      Quarto: 3,
      Quinto: 4,
      Sexto: 5,
      Sétimo: 6,
    };
    const info = data?.posto.infoPostos
      .map(h => {
        const order = ordem[h.ordemApp];
        return {
          ...h,
          order,
        };
      })
      .sort((a, b) => a.order - b.order);

    return info;
  }, [data?.posto.infoPostos]);

  if (isLoading && !data) return <Loading />;

  const hour = getHours(new Date(Date.now()));
  const [start, min_start, start_sec] = data!.posto.abertura
    .split(':')
    .map(Number);
  const [end_hour, end_min, end_sec] = data!.posto.fechamento
    .split(':')
    .map(Number);
  const termino = end_hour === 0 ? 24 : end_hour;
  const status = hour >= start && hour <= termino ? 'ABERTO' : 'FECHADO';

  const end = `${data?.posto.logradouro}, ${data?.posto.numero} - ${data?.posto.bairro}`;
  const city = `${data?.posto.nomeCidade} - ${data?.posto.uf}, ${data?.posto.cep}`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${data?.posto.latitude},${data?.posto.longitude}`;

  function navigation() {
    navigate('cards');
    // reset({
    //   routes: [{ name: 'postos' }],
    //   index: 0
    // })
  }

  return (
    <S.Container>
      <HeaderDetails goback={() => navigate('stakPostos', { placa: 'aa' })} />
      <S.boxImag>
        <Image
          alt="post banner"
          source={{ uri: data!.posto.fotoLogo }}
          h={hightPercent('30')}
          bg="gray.300"
        />
      </S.boxImag>

      <S.content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <S.header>
            <HStack flex={1} alignItems="center" space={4}>
              <Image
                alt="logo"
                source={{ uri: data?.posto.fotoBandeira }}
                resizeMode="cover"
                bg="gray.100"
                h={9}
                w={9}
              />

              <Box>
                <S.title style={{ width: widtPercent('20') }}>
                  {data?.posto.nomePostoApp}
                </S.title>
                <Center
                  w={20}
                  bg={status === 'ABERTO' ? 'green.200' : 'red.500'}
                  px={2}
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
                <S.title
                  style={{ marginTop: 5, color: color.text_color.light }}
                >
                  {km.toLocaleString('pt-BR')} km
                </S.title>
              </Center>
            </HStack>
          </S.header>

          <S.line />

          <HStack alignItems="center" space={4}>
            <Circle p={4} bg="gray.100">
              <FontAwesome5 size={18} name="clock" />
            </Circle>

            <Box>
              <S.title style={{ fontFamily: 'bold', fontSize: _text - 1 }}>
                Horário de funcionamento
              </S.title>
              <S.text style={{ fontSize: _text - 1 }}>
                {start}:{min_start || '00'} ás {end_hour}:{end_min || '00'}
              </S.text>
            </Box>
          </HStack>

          <S.line />

          <HStack alignItems="center" space={4}>
            <Circle p={4} bg="gray.100">
              <Feather size={18} name="map-pin" />
            </Circle>

            <Box flex={1}>
              <S.title style={{ fontFamily: 'bold', fontSize: _text - 1 }}>
                Endereço
              </S.title>
              <S.text style={{ fontSize: _text - 2 }}>{end}</S.text>
              <S.text style={{ fontSize: _text - 2 }}>{city}</S.text>
            </Box>
          </HStack>

          <S.line />

          <HStack space={4}>
            <Box flex={1}>
              <Button
                icon={<CarLightSvg />}
                onPress={navigation}
                title="GERAR CARTÃO"
                styleType="dark"
              />
            </Box>

            <Box flex={0.8}>
              <Button
                onPress={() => Linking.openURL(url)}
                icon={
                  <Feather
                    name="map-pin"
                    color={color.focus.regular}
                    size={20}
                  />
                }
                styleType="border"
                title="NAVEGAR"
              />
            </Box>
          </HStack>

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

            {data?.posto.precosCombustiveis.map(h => (
              <HStack key={h.id} alignItems="center" space={4} w="full">
                <Box flex={1}>
                  <S.text style={{ fontFamily: 'semi_bold', fontSize: _text }}>
                    {h.combustivel.tipoCombustivel}
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
                    {h.precoBomba.toLocaleString('pt-BR')}
                  </S.text>
                </Box>
                <Box alignItems="flex-end" w="85px">
                  <Center bg={color.focus.regular} w="50px" rounded={8} p={1}>
                    <S.text
                      style={{
                        color: '#fff',
                        fontFamily: 'bold',
                        fontSize: _text - 1,
                      }}
                    >
                      {h.precoClubGas.toLocaleString('pt-BR')}
                    </S.text>
                  </Center>
                </Box>
              </HStack>
            ))}
          </S.body>

          <Box mt={8}>
            <S.title>OBSERVAÇÕES</S.title>

            {obs?.map(h => (
              <Box mt={2}>
                <HStack alignItems="center" space={2}>
                  <Circle mt={1} bg="gray.800" size="9px" />
                  <S.textObos>{h.infoApp.informacao}</S.textObos>
                </HStack>
              </Box>
            ))}
          </Box>
        </ScrollView>
      </S.content>
    </S.Container>
  );
}
