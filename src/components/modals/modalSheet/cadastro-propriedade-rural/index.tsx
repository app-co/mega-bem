import { Button } from "@/components/forms/Button";
import { FormInput } from "@/components/forms/FormInput";
import { RadioGrup, TRadios } from "@/components/forms/RadioGrup";
import { hightPercent } from "@/styles/sizes";
import { Box, HStack } from "native-base";
import { useForm } from "react-hook-form";
import { Modalize } from "react-native-modalize";
import * as S from './styles';

interface I {
  modalizeRef: React.Ref<Modalize>;
}
export function CasdastroPropriedadeRural({ modalizeRef }: I) {
  const control = useForm()

  const radios: TRadios[] = [
    {
      text: 'Fazenda Própria',
      value: '0'
    },
    {
      text: 'Fazenda Arrendada',
      value: '1'
    },
    {
      text: 'Fazenda de Terceiro',
      value: '2'
    }, {
      text: 'Outro lugar',
      value: '3'
    },
  ]



  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      modalHeight={hightPercent('100')}
    >
      <S.container>
        <Box py='6' style={{ gap: 10 }} >
          <S.title>Cadastrar Propriedade Rural</S.title>
          <FormInput name="nomeFazenda" label="Nome da Fazenda" control={control.control} />
        </Box>

        <Box my='6' >
          <S.text>TIPO DE FAZENDA</S.text>
          <RadioGrup radios={radios} alin="column" />
        </Box>

        <S.form>
          <FormInput name='inscricao' label="Inscrição Estadual" control={control.control} />
          <FormInput name='inscricao' label="CEP" control={control.control} />
          <HStack space={2} w='full' >
            <Box w='100px'>
              <FormInput name='inscricao' label="UF" control={control.control} />
            </Box>

            <Box flex='1' >
              <FormInput name='inscricao' label="Cidade" control={control.control} />
            </Box>

          </HStack>
          <FormInput name='inscricao' label="Distância do municipi até Fazenda (km)" control={control.control} />
          <FormInput name='inscricao' label="Link da Localizção da Fazenda" control={control.control} />
          <FormInput name='inscricao' label="Descrição do Roteiro" control={control.control} />

          <Button title="CADASTRAR ENDEREÇO" />
        </S.form>
      </S.container>
    </Modalize>
  )
}