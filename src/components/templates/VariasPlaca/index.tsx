import React, { ReactNode } from 'react';
import { Alert, ScrollView, Share } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Center, VStack } from 'native-base';

import { SendSvg } from '@/assets/svgs/send';
import { Selection } from '@/components/forms/Selection';
import { color } from '@/styles/color';
import { _title, hightPercent } from '@/styles/sizes';

import * as S from './styles';

interface I {
  selectedPlaca: (h: string) => void;
  itens: { label: string; value: string }[];
  ico: ReactNode;
  text: string;
}

export function VariasPlaca({ selectedPlaca, text, ico, itens }: I) {
  const [placa, setPlaca] = React.useState<string>('');

  const shareMessage = async () => {
    try {
      const result = await Share.share({
        title: 'Chave pix copia e cola',
        message: 'copi right',
      });

      if (result.action === Share.sharedAction) {
        Alert.alert(
          'Compartilhado com sucesso',
          'O chave foi compartilhada com sucesso.',
        );
      } else if (result.action === Share.dismissedAction) {
        Alert.alert(
          'Ops, parece que algo deu errado',
          'O chave não foi compartilhada.',
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <VStack mt={8} space={2}>
          <S.text>Selecione uma placa</S.text>
          <Selection
            label="Placa do Veículo"
            itens={itens}
            itemSelected={h => setPlaca(h)}
            placeholder="Selecione aqui sua placa"
          />

          <TouchableOpacity
            style={{ marginTop: '10%' }}
            onPress={() => selectedPlaca(placa)}
          >
            <Center
              bg={color.focus.regular}
              h={hightPercent('25')}
              rounded="15px"
            >
              {ico}
              <S.title
                style={{
                  color: '#fff',
                  fontSize: _title,
                  marginTop: 20,
                  textAlign: 'center',
                }}
              >
                {text}
              </S.title>
            </Center>
          </TouchableOpacity>
        </VStack>

        <S.share onPress={shareMessage}>
          <SendSvg />
          <S.text
            style={{
              color: '#fff',
              fontFamily: 'semi_bold',
              flex: 1,
              textAlign: 'center',
            }}
          >
            COMPARTILHAR COM UM AMIGO
          </S.text>
        </S.share>
      </ScrollView>
    </S.Container>
  );
}
