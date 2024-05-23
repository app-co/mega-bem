import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { TRegisterUser, schemaSingUp } from '@/hooks/fetchs/schemas'
import * as mutation from '@/hooks/mutations'
import { AppError } from '@/services/AppError'
import { color } from '@/styles/color'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Checkbox, HStack, useToast } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import * as S from './styles'
export function RegisterTemplate() {
  const { isLoading, mutateAsync: singUp } = mutation.singUp()

  const control = useForm<TRegisterUser>({
    resolver: zodResolver(schemaSingUp)
  })

  const [img, setImg] = React.useState<string | null>(null)
  const [termos, setTermos] = React.useState<boolean>(false)
  const [typeUser, setTypeUser] = React.useState<string | null>(null)
  const [load, setLoad] = React.useState<boolean>(false)

  const toast = useToast()

  console

  const tipoUser = [
    { label: 'Vendedor', value: '0' },
    { label: 'Comprador', value: '1' },
    { label: 'Parceiro', value: '2' },
    { label: 'Outros', value: '3' },
  ]

  const submit = React.useCallback(async (input: TRegisterUser) => {
    setLoad(true)

    if (!termos) {
      toast.show({
        title: 'Aceite os termos para continuar',
        duration: 2000,
        bg: color.alert
      })
      setLoad(false)
      return
    }

    const [nome, sobrenome] = input.nome.split(' ')

    const dt = {
      ...input,
      telefone: `${input.ddd_telefone}${input.telefone}`,
      nome,
      sobrenome,
      origem: 1,
      listGrupoId: [],
      listEmpresaId: [],
    }

    // const deviceId = Device.default.sessionId;
    try {

      await singUp(dt)
      setLoad(false)
    } catch (error) {
      setLoad(false)

      if (error instanceof AppError) {
        toast.show({
          title: 'Erro',
          description: error.message,
          bg: color.alert,
          placement: 'top'
        })
      }
    }
  }, [typeUser, termos])

  return (
    <S.container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >

        <S.form>
          <S.title>INFORMAÇÕES PESSOAIS</S.title>
          <FormInput placeholder='Luciana Tavares' label='Nome Completo' name='nome' control={control.control} error={control.formState.errors.nome} />
          <FormInput maxLength={14} placeholder='000.000.000-00' label='CPF' name='cpfCnpj' control={control.control} error={control.formState.errors.cpfCnpj} />

          <S.title>INFORMAÇÕES DE CONTATO</S.title>
          <HStack space={3} >
            <Box w={'75px'} >
              <FormInput maxLength={2} placeholder='(00)' label='DDD' name='ddd_telefone' control={control.control} error={control.formState.errors.ddd_telefone} />
            </Box>

            <Box flex={1} >
              <FormInput maxLength={9} placeholder="Ex. 99999-9999" label="Celular" name='telefone' control={control.control} error={control.formState.errors.telefone} />
            </Box>
          </HStack>

          <S.line />
          <FormInput autoCapitalize='none' keyboardType='email-address' placeholder='exemplo@exemplo.com' label='E-mail' name='email' control={control.control} error={control.formState.errors.email} />
          <FormInput placeholder='Insira uma senha que lembre' label='Senha' name='senha' control={control.control} error={control.formState.errors.senha} />
          <S.line />

          {/* 
          <S.title>TIPO DE USUÁRIO</S.title>

          <Selection itemSelected={h => console.log(h)} itens={tipoUser} /> */}

          <Checkbox value='termos' onChange={() => setTermos(!termos)} _checked={{ bg: color.focus.regular, borderColor: '#ffffff3' }} _text={{ fontSize: 12 }} >Li e aceito os Termos de Uso e Privacidade</Checkbox>

          <Button title='FINALIZAR CADASTRO' load={load} onPress={control.handleSubmit(submit)} />
        </S.form>

      </ScrollView>
    </S.container>
  )
}