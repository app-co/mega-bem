import { GasSvg } from '@/assets/svgs/gas'
import { SendSvg } from '@/assets/svgs/send'
import { FormInput } from '@/components/forms/FormInput'
import { Selection } from '@/components/forms/Selection'
import { useAuth } from '@/contexts/auth'
import { color } from '@/styles/color'
import { _title, hightPercent } from '@/styles/sizes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Center, ScrollView } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { z } from 'zod'
import * as S from './styles'

interface I {
  setItem: (item: string) => void
}

export function ListPostosByTypeUser({ setItem }: I) {
  const { user } = useAuth()

  const [selectedPlac, setSelectedPlac] = React.useState('')

  const control = useForm<{ Placa: string }>({
    resolver: zodResolver(z.object({ Placa: z.string() }))
  })
  const placas = user!.placas.map(h => {
    return {
      label: h,
      value: h,
    }
  })

  function submit(data: { Placa: string }) {
    setItem(data.Placa)
  }
  return (

    <S.Container>
      <ScrollView flex={1} >

        <S.text>Para visualizar a lista de postos, você precisa informar a placa cadastrada em nosso sistema.
          Por favor, forneça sua placa para que eu possa ajudá-lo a acessar a lista de postos disponíveis.
        </S.text>

        {!user!.associado && (
          <Box mt={8}>
            <FormInput
              mask='placa'
              name='Placa'
              placeholder='ABC1D23'
              label='Placa do Veículo'
              autoCapitalize='characters'
              maxLength={7}
              control={control.control}
              error={control.formState.errors.Placa}
            />
            <TouchableOpacity onPress={control.handleSubmit(submit)} >
              <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} mt={hightPercent('10')} >
                <GasSvg width={80} height={83} />
                <S.title style={{ color: '#fff', fontSize: _title }} >LISTAR POSTOS</S.title>
              </Center>

            </TouchableOpacity>
          </Box>
        )}

        {user!.associado && user!.placas?.length > 0 && (

          <Box flex={1} justifyContent={'space-between'} mt={8}>
            <S.text style={{ marginBottom: 10, fontFamily: 'regular' }}>Selecione uma placa</S.text>
            <Selection itens={placas} itemSelected={h => setSelectedPlac(h)} />

            <TouchableOpacity onPress={() => setItem(selectedPlac)} >
              <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} mt={hightPercent('5')} >
                <GasSvg width={80} height={83} />
                <S.title style={{ color: '#fff', fontSize: _title }} >LISTAR POSTOS</S.title>
              </Center>
            </TouchableOpacity>
          </Box>
        )}

        <S.share>
          <SendSvg />
          <S.text style={{ color: '#fff', fontFamily: 'semi_bold', flex: 1, textAlign: 'center' }} >COMPARTILHAR COM UM AMIGO</S.text>
        </S.share>
      </ScrollView>
    </S.Container>
  )
}