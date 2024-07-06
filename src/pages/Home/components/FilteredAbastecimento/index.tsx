import React from 'react';

import { Box, HStack, Image } from 'native-base';

import { _text, widtPercent } from '@/styles/sizes';

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
          <Box>
            <S.title style={{ width: widtPercent('21') }}>
              {item?.nomePosto}
            </S.title>

            <S.text style={{ fontSize: _text - 3, fontFamily: 'trin' }}>
              {item.nomeCombustivel}
            </S.text>
          </Box>
        </HStack>

        <Box alignItems="flex-end">
          <S.text style={{ fontSize: _text - 3 }}>
            {item.dataAbastecimento}
          </S.text>
          <S.title>{total}</S.title>
        </Box>
      </S.row>
      <S.boxInfo>
        <S.text style={{ fontSize: _text - 3 }}>{item.placa}</S.text>
        <S.text style={{ fontSize: _text - 3 }}>
          {Number(item.qtdLitrosAbastecido).toLocaleString('pt-BR')} LITROS
        </S.text>
        <S.text
          style={{
            fontSize: _text - 4,
            textDecorationLine: 'line-through',
            color: '#a64949',
            fontFamily: 'bold',
            textDecorationLine: 'line-through',
          }}
        >
          {Number(item.totalPrecoBomba).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </S.text>
        <S.text
          style={{ color: '#49a64e', fontFamily: 'bold', fontSize: _text - 2 }}
        >
          R$ {Number(item.totalPrecoClubGas).toLocaleString('pt-BR')}
        </S.text>
      </S.boxInfo>

      <S.Line />
    </S.Container>
  );
}
