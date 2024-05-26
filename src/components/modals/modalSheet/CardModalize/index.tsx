import { useAuth } from "@/contexts/auth";
import { AbastecimentoCard } from "@/pages/Cartao/AbastecimentoCard";
import { VirtualCard } from "@/pages/Cartao/VirtualCard";
import { hightPercent } from "@/styles/sizes";
import { zodResolver } from "@hookform/resolvers/zod";
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
export function CardModalize({ modalizeRef }: I) {
  const { user } = useAuth()
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
      <S.Container>
        {user?.associado ? (
          <VirtualCard />
        ) : (
          <AbastecimentoCard />
        )}
      </S.Container>
    </Modalize>
  )
}