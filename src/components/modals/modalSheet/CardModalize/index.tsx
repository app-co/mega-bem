import { Logo } from "@/assets/svgs/logo";
import { LogoIco } from "@/assets/svgs/logo-ico";
import { useAuth } from "@/contexts/auth";
import { IVirtualCard } from "@/hooks/fetchs/types";
import { color } from "@/styles/color";
import { hightPercent } from "@/styles/sizes";
import { Box, HStack } from "native-base";
import { Modalize } from "react-native-modalize";
import { z } from "zod";
import * as S from './styles';

const schema = z.object({
  email: z.string().email('email inválido'),
})

type TMail = z.infer<typeof schema>

interface I {
  modalizeRef: React.Ref<Modalize>;
  item: IVirtualCard | undefined
  placa: string;
}
export function CardModalize({ modalizeRef, item, placa }: I) {
  const { user } = useAuth()

  const [nome, sobrenome] = user!.nome.split(' ').map(String)


  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      modalHeight={hightPercent('80')}
      overlayStyle={{ padding: 20 }}
    >
      <S.Container>

        <S.text style={{ marginTop: 30 }} >
          Informe ao <S.textBold>frentista</S.textBold> o código gerado em seu
          cartão virtual <S.textBold>antes do abastecimento.</S.textBold>
        </S.text>

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

          <S.cod>{item?.codCartao}</S.cod>
          <LogoIco />

          <HStack alignItems={'flex-end'} justifyContent={'space-between'} w={'full'} >
            <Box>
              <S.text style={{ color: '#fff' }} >VÁLIDO ATÉ {item?.dataValidade}</S.text>
              <S.textBold style={{ color: '#fff' }} >{nome} {sobrenome}</S.textBold>
            </Box>

            <S.text style={{ color: '#fff' }} >{item?.nomeGrupo}</S.text>
          </HStack>
        </S.card>
      </S.Container>
    </Modalize>
  )
}