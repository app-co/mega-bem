import { SendSvg } from '@/assets/svgs/send'
import { WalletBarSvg } from '@/assets/svgs/wallet-bar'
import { FormInput } from '@/components/forms/FormInput'
import { Selection } from '@/components/forms/Selection'
import { useAuth } from '@/contexts/auth'
import { color } from '@/styles/color'
import { _title, hightPercent } from '@/styles/sizes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Center, VStack } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { z } from 'zod'
import * as S from './styles'

interface I {
  setPlaca: (h: string) => void
  setCpf: (h: string) => void
  pres: () => void
}

const schema = z.object({
  placa: z.string({ message: '* obrigatório' }).min(7, 'Placa inválida'),
  cpf: z.string({ message: '* obrigatório' }),
})
type T = z.infer<typeof schema>

export function AbastecimentoCard({ setPlaca, pres, setCpf }: I) {
  const { user } = useAuth()
  const [placa, setSelectPlaca] = React.useState('')

  const control = useForm<T>({
    resolver: zodResolver(schema),
  })

  const placas = user?.placas && user.placas.length > 1
    ? user.placas.map((h) => {
      return {
        label: h,
        value: h,
      }
    })
    : null

  function submit(input: T) {
    console.log({ input })
    setPlaca(input.placa)
    setCpf(input.cpf)
    pres()
  }

  return (
    <S.Container>
      <Box>
        <S.title style={{ textAlign: 'center' }} >Gerar Cartão Virtual</S.title>

        <S.text style={{ marginTop: 30 }} >
          Informe ao <S.textBold>frentista</S.textBold> o código gerado em seu
          cartão virtual <S.textBold>antes do abastecimento.</S.textBold>
        </S.text>

        <S.text style={{ marginTop: 15 }} >
          Cada codigo é unico e só poderá ser utilizado para um abastecimento.
        </S.text>

        {user?.placas.length === 0 && (
          <Box style={{ gap: 20 }} mt={8}>
            <FormInput
              mask='placa'
              name='placa'
              placeholder='ABC1D23'
              label='Placa do Veículo'
              control={control.control}
              autoCapitalize='characters'
              maxLength={8}
              error={control.formState.errors.placa}
            />

            <FormInput
              mask='cpf'
              name='cpf'
              placeholder=''
              label='CPF/CNPJ'
              control={control.control}
              autoCapitalize='characters'
              maxLength={18}
              keyboardType='numeric'
              error={control.formState.errors.cpf}
            />

            <TouchableOpacity
              onPress={control.handleSubmit(submit)}
            >
              <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} >
                <WalletBarSvg width={80} height={83} fill='#fff' />
                <S.title style={{ color: '#fff', fontSize: _title, marginTop: 20, textAlign: 'center' }} >GERAR CARTÃO DE ABASTECIMENTO</S.title>
              </Center>
            </TouchableOpacity>
          </Box>
        )}

        {user!.placas.length > 1 && (
          <VStack mt={8} space={2}>
            <S.text>Selecione uma placa</S.text>
            <Selection itens={placas!} itemSelected={h => setPlaca(h)} />

            <TouchableOpacity
              onPress={() => submit({ placa: placa, cpf: user!.cpfCnpj })}
            >
              <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} >
                <WalletBarSvg width={80} height={83} fill='#fff' />
                <S.title style={{ color: '#fff', fontSize: _title, marginTop: 20, textAlign: 'center' }} >GERAR CARTÃO DE ABASTECIMENTO</S.title>
              </Center>
            </TouchableOpacity>
          </VStack>
        )}

        {user?.placas.length === 1 && (

          <Box>
            <TouchableOpacity style={{ marginTop: hightPercent('15') }} onPress={pres} >
              <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} >
                <WalletBarSvg width={80} height={83} fill='#fff' />
                <S.title style={{ color: '#fff', fontSize: _title, marginTop: 20, textAlign: 'center' }} >GERAR CARTÃO DE ABASTECIMENTO</S.title>
              </Center>
            </TouchableOpacity>
          </Box>
        )}
      </Box>


      <S.share>
        <SendSvg />
        <S.text style={{ color: '#fff', fontFamily: 'semi_bold', flex: 1, textAlign: 'center' }} >COMPARTILHAR COM UM AMIGO</S.text>
      </S.share>

    </S.Container >
  )
}