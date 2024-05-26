import { Logo } from '@/assets/svgs/logo'
import { LogoIco } from '@/assets/svgs/logo-ico'
import { SendSvg } from '@/assets/svgs/send'
import { WalletBarSvg } from '@/assets/svgs/wallet-bar'
import { Loading } from '@/components/Loading'
import { FormInput } from '@/components/forms/FormInput'
import { useAuth } from '@/contexts/auth'
import { IVirtualCard } from '@/hooks/fetchs/types'
import * as mutation from '@/hooks/mutations'
import { AppError } from '@/services/AppError'
import { color } from '@/styles/color'
import { _title, hightPercent } from '@/styles/sizes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Center, HStack, useToast } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { z } from 'zod'
import * as S from './styles'

const schema = z.object({
  Placa: z.string().min(8, 'Placa inválida'),
  Cpf: z.string().min(11, 'CPF inválido'),
})
type T = z.infer<typeof schema>

export function AbastecimentoCard() {
  const { user } = useAuth()
  const [placa, setPlaca] = React.useState<string | null>(null)

  const control = useForm<T>({
    resolver: zodResolver(schema),
  })

  const toast = useToast()

  const [virtuarCard, setVirtualCard] = React.useState<IVirtualCard | null>(null)

  const { mutateAsync, isLoading } = mutation.gerarVirtualCard()

  const submit = React.useCallback(async (input: T) => {
    try {
      const dt = {
        Cpf: '15397558788',
        Placa: input.Placa,
        AssociadoId: user?.associadoId ?? null
      }

      console.log(dt)

      const data = await mutateAsync(dt)

      setVirtualCard(data)
      setPlaca(input.Placa)

    } catch (error) {

      console.log({ error })

      if (error instanceof AppError) {
        toast.show({
          title: 'Erro',
          description: error.message,
          bg: color.alert,
          placement: 'top'
        })
      }

    }

  }, [])

  const [nome, sobrenome] = user!.nome.split(' ').map(String)


  if (isLoading) return <Loading />

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

        <Box style={{ gap: 20 }} mt={8}>
          <FormInput
            mask='placa'
            name='Placa'
            placeholder='ABC1D23'
            label='Placa do Veículo'
            control={control.control}
            autoCapitalize='characters'
            maxLength={7}
            error={control.formState.errors.Placa}
          />

          <FormInput
            mask='cpf'
            name='Cpf'
            placeholder=''
            label='CPF/CNPJ'
            control={control.control}
            autoCapitalize='characters'
            maxLength={11}
            error={control.formState.errors.Placa}
          />
        </Box>

      </Box>

      <Box>

        {virtuarCard ? (
          <S.card
            colors={[color.focus.regular, '#3134a5', color.focus.regular]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >

            <HStack mb={6} justifyContent={'space-between'}>
              <Box flex={1} >
                <Logo />

              </Box>
              <S.title style={{ color: '#fff' }} >Placa: {placa}</S.title>
            </HStack>

            <S.cod>{virtuarCard.codCartao}</S.cod>
            <LogoIco />

            <HStack alignItems={'flex-end'} justifyContent={'space-between'} w={'full'} >
              <Box>
                <S.text style={{ color: '#fff' }} >VÁLIDO ATÉ 14/02/2/24</S.text>
                <S.textBold style={{ color: '#fff' }} >{nome} {sobrenome}</S.textBold>
              </Box>

              <S.text style={{ color: '#fff' }} >{virtuarCard.nomeGrupo}</S.text>
            </HStack>
          </S.card>

        ) : (
          <TouchableOpacity onPress={control.handleSubmit(submit)} >

            <Center bg={color.focus.regular} h={hightPercent('25')} rounded={'15px'} >
              <WalletBarSvg width={80} height={83} fill='#fff' />
              <S.title style={{ color: '#fff', fontSize: _title, marginTop: 20, textAlign: 'center' }} >GERAR CARTÃO DE ABASTECIMENTO</S.title>
            </Center>

          </TouchableOpacity>

        )}


        <S.share>
          <SendSvg />
          <S.text style={{ color: '#fff', fontFamily: 'semi_bold', flex: 1, textAlign: 'center' }} >COMPARTILHAR COM UM AMIGO</S.text>
        </S.share>

      </Box>
    </S.Container>
  )
}