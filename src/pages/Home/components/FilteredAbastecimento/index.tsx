import React from 'react';

import { Box, HStack, Image } from 'native-base';

import { TextWithLimit } from '@/components/elements/text-with-limit';

import * as S from './styles';

interface HistoricosAbastecimento {
  bandeira: string;
  nomePosto: string;
  totalPrecoBomba: string;
  totalPrecoClubGas: string;
  horasAbastecimento: string;
  dataAbastecimento: string;
  placa: string;
  nomeCombustivel: string;
  qtdLitrosAbastecido: string;
  fotoBandeira: null | string;
}

interface I {
  item: HistoricosAbastecimento;
}

export function FilteredAbastecimento({ item }: I) {
  const total = (
    Number(item.totalPrecoBomba) - Number(item.totalPrecoClubGas)
  ).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <S.Container>
      <S.row>
        <HStack space={3}>
          <Image
            source={{ uri: item.fotoBandeira }}
            w={8}
            h={8}
            alt="bandeira"
          />
          <Box flex={1}>
            <TextWithLimit characterLimit={10} text={item.nomePosto} />
            <S.text>{item.nomeCombustivel}</S.text>
          </Box>
        </HStack>

        <Box alignItems="flex-end">
          <S.text>{item.dataAbastecimento}</S.text>
          <S.title>{total}</S.title>
        </Box>
      </S.row>
      <S.boxInfo>
        <S.text>{item.placa}</S.text>
        <S.text>{item.qtdLitrosAbastecido}</S.text>
        <S.text
          style={{
            color: '#a64949',
            fontFamily: 'bold',
            textDecorationLine: 'line-through',
          }}
        >
          {item.totalPrecoBomba}
        </S.text>
        <S.text style={{ color: '#49a64e', fontFamily: 'bold' }}>
          {item.totalPrecoClubGas}
        </S.text>
      </S.boxInfo>

      <S.Line />
    </S.Container>
  );
}
