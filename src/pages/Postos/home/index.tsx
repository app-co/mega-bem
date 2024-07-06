import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';

import { Feather } from '@expo/vector-icons';

import { Box, HStack } from 'native-base';
import { z } from 'zod';

import { GasSvg } from '@/assets/svgs/gas';
import { Loading } from '@/components/Loading';
import { SemPlaca } from '@/components/templates/SemPlaca';
import { VariasPlaca } from '@/components/templates/VariasPlaca';
import { useAuth } from '@/contexts/auth';
import { UseFatch } from '@/hooks/fetchs';
import { IGetPostos } from '@/hooks/fetchs/types';
import { getPosts } from '@/hooks/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { CardDetails } from '../components/CardDetails';
import * as S from './styles';

interface ICoords {
  coords: Coords;
  timestamp: number;
}

interface Coords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

const schema = z.object({
  placa: z.string({ message: '* obrigatório' }).min(7, 'Placa inválida'),
  cpfCnpj: z.string({ message: '* obrigatório' }),
});
type TSchema = z.infer<typeof schema>;

const fetch = new UseFatch();
export function Postos() {
  const params = useRoute().params as { placa: string };
  const naviagtion = useNavigation();
  const { user } = useAuth();
  const [placa, setPlaca] = React.useState<string>(
    user?.placas.length === 1 ? user!.placas[0] : params?.placa,
  );
  const [cpf, setCpf] = React.useState<string>(user!.cpfCnpj);
  const { mutateAsync, isLoading } = getPosts();

  const control = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const placas = user!.placas.map(h => {
    return {
      label: h,
      value: h,
    };
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = React.useState<IGetPostos[]>([]);

  function submit(input: TSchema) {
    setPlaca(input.placa);
    setCpf(input.cpfCnpj);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const rs = await mutateAsync({
        Latitude: location!.coords.latitude,
        Longitude: location!.coords.longitude,
        pageNumber: 1,
        pageSize: 1,
        Placa: placa,
        cpfCnpj: cpf,
      });

      setData(rs);
    })();
  }, [cpf, mutateAsync, placa]);

  useFocusEffect(
    useCallback(() => {
      if (user?.placas.length === 1) {
        setPlaca(user.placas[0]);
      } else {
        setPlaca(params?.placa ?? '');
      }
    }, [params?.placa, user]),
  );

  const typeAcessComponent: any = {
    'sem-placa': (
      <SemPlaca
        control={control}
        submit={control.handleSubmit(submit)}
        ico={<GasSvg fill="#fff" />}
        text="LISTAR POSTOS"
      />
    ),
    'varias-placa': (
      <VariasPlaca
        text="LISTAR POSTOS"
        itens={placas}
        selectedPlaca={h => setPlaca(h)}
        ico={<GasSvg fill="#fff" />}
      />
    ),
  };

  const typeAcess = React.useMemo(() => {
    let acess = 'sem-placa';

    if (placas.length === 0) {
      acess = 'sem-placa';
      return acess;
    }

    if (placas.length > 1) {
      acess = 'varias-placa';
      return acess;
    }

    if (placas.length === 1) {
      acess = 'uma-placa';
      return acess;
    }

    return acess;
  }, [user]);

  console.log({ placa });

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <HStack alignItems="center" my={8}>
        <TouchableOpacity
          onPress={() =>
            naviagtion.reset({
              index: 1,
              routes: [{ name: 'home' }],
            })
          }
        >
          <Feather size={25} name="arrow-left" />
        </TouchableOpacity>
        <S.title style={{ fontSize: 20, marginLeft: '35%' }}>Postos</S.title>
      </HStack>
      {placa ? (
        <Box style={{ gap: 8 }}>
          <FlatList
            data={data}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => <CardDetails item={h} />}
          />
        </Box>
      ) : (
        <Box>
          <S.text>
            Para visualizar a Lista de Postos, informe sua placa cadastrada na
            MegaBem
          </S.text>
          {typeAcessComponent[typeAcess]}
        </Box>
      )}
    </S.Container>
  );
}
