import React, { ReactNode } from 'react';
import { ScrollView, Share, TouchableOpacity } from 'react-native';

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
      await Share.share({
        title: 'link loja',
        message: 'Enviar para',
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Box style={{ gap: 20 }} mt={8}>
          <FormInput
            typeInput="placa"
            mask="placa"
            name="placa"
            label="Placa do Veículo"
            control={control.control}
            autoCapitalize="characters"
            maxLength={8}
            error={control.formState.errors.placa}
            placeholder="Digite aqui sua placa"
            placeholderTextColor={color.text_color.light}
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
      </ScrollView>
    </S.Container>
  );
}
