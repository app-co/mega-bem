import car from '@/assets/a_.jpg'
import estetoscopio from '@/assets/estetoscopio.png'
import ferr from '@/assets/ferr.png'
import { DocSvg } from '@/assets/svgs/doc'
import { GasSvg } from '@/assets/svgs/gas'
import { ProtectSvg } from '@/assets/svgs/protect'
import { SendSvg } from '@/assets/svgs/send'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { color } from '@/styles/color'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Center, Image } from 'native-base'
import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Share } from 'react-native'
import { useQuery } from 'react-query'
import * as S from './styles'

interface I {
  modalize: () => void
}

const fetch = new UseFatch()
export function Servicos({ modalize }: I) {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const getInfoHome = useQuery({
    queryKey: ['getInfoHome'],
    queryFn: async () => await fetch.infoHome(user!.usuarioId),
  })

  function navigateToHitoryPayment() {
    navigate('historico-pagamento')
  }

  const shareMessage = async () => {
    try {
      const result = await Share.share({
        title: 'Chave pix copia e cola',
        message: 'copi right',
      });

      if (result.action === Share.sharedAction) {
        Alert.alert(
          'Compartilhado com sucesso',
          'O chave foi compartilhada com sucesso.',
        );
      } else if (result.action === Share.dismissedAction) {
        Alert.alert(
          'Ops, parece que algo deu errado',
          'O chave não foi compartilhada.',
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  const servicos = [
    { onpres: () => { navigate('historico-abasstecimento') }, type: 'fill', ico: <DocSvg />, text: 'MEUS ABASTECIMENTOS', },
    { onpres: () => { }, type: 'border', ico: <Image alt='ico' source={car} />, text: 'TAG PEDÁGIO SEM MENDALIDADE' },
    { onpres: () => { }, type: 'border', ico: <Image source={ferr} alt='ferramenta' />, text: 'ASSISTÊNCIA VEICULAR TOTAL 24H' },
    { onpres: () => { }, type: 'border', ico: <Image alt='ico' source={estetoscopio} />, text: 'TELEMEDICINA' },
    { onpres: () => { }, type: 'border', ico: <ProtectSvg width={30} height={30} fill='#fff' strong={color.focus.regular} />, text: 'SEGURO E PROTEÇÃO VEICULAR' },
    { onpres: () => { }, type: 'border', ico: <Feather name='dollar-sign' size={26} color={color.focus.regular} />, text: 'DESCONTOS EM PRODUTOS DE SERVIÇOS' },
    { onpres: () => { shareMessage() }, type: 'fill', ico: <SendSvg />, text: 'COMPARTILHAR COM UM AMIGO' },
  ]

  const modal = user?.placas.length === 1 && user.associado


  if (getInfoHome.isLoading) return <ActivityIndicator size={'large'} color={color.focus.extr_light} />

  return (
    <S.Container>
      <S.title>Servicos</S.title>

      <S.abastecer onPress={() => navigate('postos')} >
        <GasSvg fill='#fff' />

        <Center flex={1} >
          <S.title style={{ fontFamily: 'bold' }} >ABASTERCER COM DESCONTO</S.title>
          <Box mt='2' bg={'gray.100'} rounded={'20px'} py={1} px={2} >
            <S.title style={{ fontFamily: 'regular', color: color.text_color.dark }} >{getInfoHome.data?.totalEconomizado ?? 'R$ 0,00'} ECONOMIZADOS</S.title>
          </Box>
        </Center>
      </S.abastecer>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 550 }}
      >
        <Box mt={2} >
          {servicos.map(h => (
            <S.box disabled={!user?.associado} onPress={h.onpres} key={h.text} cor={h.type} >
              {h.ico}
              <Center flex={1} >
                <S.textServico cor={h.type}>{h.text}</S.textServico>
              </Center>
            </S.box>
          ))}

        </Box>

      </ScrollView>

    </S.Container>
  )
}