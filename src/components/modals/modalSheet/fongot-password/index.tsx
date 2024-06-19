import { ForgotSvg } from "@/assets/svgs/forgot";
import { Button } from "@/components/forms/Button";
import { FormInput } from "@/components/forms/FormInput";
import { AppError } from "@/services/AppError";
import { apiMega } from "@/services/api-mega";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, useToast } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { Modalize } from "react-native-modalize";
import { z } from "zod";
import * as S from './styles';

const schema = z.object({
  email: z.string({ message: '* digite seu email' }).email('email inválido'),
})

type TMail = z.infer<typeof schema>

interface I {
  modalizeRef: React.Ref<Modalize>;
}
export function ForgotPassword({ modalizeRef }: I) {
  const control = useForm<TMail>({
    resolver: zodResolver(schema)
  })

  const [load, setLoad] = React.useState<boolean>(false)

  const toast = useToast()

  async function forgotPassword(input: TMail) {
    setLoad(true)
    try {
      await apiMega.post(`/Usuario/solicitar-reset-senha/${input.email}`)

      toast.show({
        title: 'E-mail enviado com sucesso',
        description: 'Verifique seu e-mail',
        duration: 3000,
        bg: 'green.500',
        placement: 'top'
      })

      modalizeRef?.current?.close()
      setLoad(false)
    } catch (error) {
      setLoad(false)

      if (error instanceof AppError) {
        toast.show({
          title: 'Alerta!',
          description: error.message,
          bg: "#df9328",
          placement: 'top'
        })
      }
      console.log({ error })
    }
  }

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      overlayStyle={{ padding: 20 }}
      adjustToContentHeight

    >
      <S.container>
        <Box py='6' style={{ gap: 10 }} >
          <S.title>Recuperar Senha</S.title>

          <S.text>
            Insira seu e-mail para receber um código de recuperação de senha em seu e-mail.
          </S.text>
        </Box>

        <ForgotSvg />

        <S.form>
          <FormInput
            placeholder="Ex: exemple@exemplo.com"
            name='email'
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control.control}
            error={control.formState.errors.email}
          />
          <Button load={load} title="ENVIAR" onPress={control.handleSubmit(forgotPassword)} />
        </S.form>
      </S.container>
    </Modalize>
  )
}