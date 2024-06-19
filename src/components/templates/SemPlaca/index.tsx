import React, { ReactNode } from 'react';
import { Alert, Share, TouchableOpacity } from 'react-native';

import { Box, Center } from 'native-base';

import { SendSvg } from '@/assets/svgs/send';
import { FormInput } from '@/components/forms/FormInput';
import { color } from '@/styles/color';
import { _title, hightPercent } from '@/styles/sizes';

import * as S from './styles';

interface I {
  control: any;
  submit: () => void;
  ico: ReactNode;
  text?: string;
}

export function SemPlaca({ control, text, submit, ico }: I) {
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
      <Box style={{ gap: 20 }} mt={8}>
        <FormInput
          typeInput="placa"
          mask="placa"
          name="placa"
          placeholder="ABC1D23"
          label="Placa do Veículo"
          control={control.control}
          autoCapitalize="characters"
          maxLength={8}
          error={control.formState.errors.placa}
        />

        <FormInput
          mask="cpf"
          name="cpfCnpj"
          placeholder=""
          label="CPF/CNPJ"
          control={control.control}
          autoCapitalize="characters"
          maxLength={18}
          keyboardType="numeric"
          error={control.formState.errors.cpfCnpj}
        />

        <TouchableOpacity style={{ marginTop: '5%' }} onPress={submit}>
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
      </Box>

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
    </S.Container>
  );
}
