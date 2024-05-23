import { GasSvg } from '@/assets/svgs/gas'
import { SendSvg } from '@/assets/svgs/send'
import { FormInput } from '@/components/forms/FormInput'
import { color } from '@/styles/color'
import { _title, hightPercent } from '@/styles/sizes'
import { Box, Center } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Modalize } from 'react-native-modalize'
import * as S from './styles'

interface I {
  modalize: React.Ref<Modalize>
}

export function PostosModalize({ modalize }: I) {
  const control = useForm()
  return (
    <Modalize ref={modalize} >
      <S.Container>
        <S.title>Postos</S.title>

        <S.text>Para visualizar a lista de postos, você precisa informar a placa cadastrada em nosso sistema.
          Por favor, forneça sua placa para que eu possa ajudá-lo a acessar a lista de postos disponíveis.
        </S.text>

        <Box mt={8}>
          <FormInput
            name='placa' placeholder='ABC1D23'
            label='Placa do Veículo'
            control={control.control}
            error={control.formState.errors.placa}
          />
        </Box>

        <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} mt={hightPercent('10')} >
          <GasSvg width={80} height={83} />
          <S.title style={{ color: '#fff', fontSize: _title }} >LISTAR POSTOS</S.title>
        </Center>

        <S.share>
          <SendSvg />
          <S.text style={{ color: '#fff', fontFamily: 'semi_bold', flex: 1, textAlign: 'center' }} >COMPARTILHAR COM UM AMIGO</S.text>
        </S.share>
      </S.Container>
    </Modalize>
  )
}