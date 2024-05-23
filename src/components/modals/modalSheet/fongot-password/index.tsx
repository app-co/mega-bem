import { ForgotSvg } from "@/assets/svgs/forgot";
import { Button } from "@/components/forms/Button";
import { FormInput } from "@/components/forms/FormInput";
import { hightPercent } from "@/styles/sizes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "native-base";
import { useForm } from "react-hook-form";
import { Modalize } from "react-native-modalize";
import { z } from "zod";
import * as S from './styles';

const schema = z.object({
  email: z.string().email('email inválido'),
})

type TMail = z.infer<typeof schema>

interface I {
  modalizeRef: React.Ref<Modalize>;
}
export function ForgotPassword({ modalizeRef }: I) {
  const control = useForm<TMail>({
    resolver: zodResolver(schema)
  })

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      modalHeight={hightPercent('80')}
      overlayStyle={{ padding: 20 }}
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
          <FormInput placeholder="Ex: exemple@exemplo.com" name='inscricao' label="E-mail" control={control.control} />
          <Button title="CADASTRAR ENDEREÇO" />
        </S.form>
      </S.container>
    </Modalize>
  )
}