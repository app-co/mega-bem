import { Loading } from '@/components/Loading'
import { Button } from '@/components/forms/Button'
import { UseFatch } from '@/hooks/fetchs'
import { color } from '@/styles/color'
import { _text, hightPercent, widtPercent } from '@/styles/sizes'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getHours } from 'date-fns'
import { Box, Center, Circle, HStack, Image } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import * as S from './styles'

const fetch = new UseFatch()
export function Details() {
  const { idPosto, km } = useRoute().params as { idPosto: string, km: number }
  const { navigate, reset } = useNavigation()

  const itens = Array.from({ length: 6 })
  const { data, isLoading } = useQuery({
    queryKey: ['posto-details'],
    queryFn: async () => await fetch.getInfoPosto({ idPosto: idPosto })
  })

  if (isLoading && !data) return <Loading />

  const hour = getHours(new Date(Date.now()))
  const [start, min_start, start_sec] = data!.posto.abertura.split(':').map(String)
  const [end_hour, end_min, end_sec] = data!.posto.fechamento.split(':').map(String)
  const status = hour > Number(start) && hour < Number(end_hour)
    ? 'ABERTO'
    : 'FECHADO'

  const end = `${data?.posto.logradouro}, ${data?.posto.numero} - ${data?.posto.bairro}`
  const city = `${data?.posto.nomeCidade} - ${data?.posto.uf}, ${data?.posto.cep}`

  function navigation() {
    navigate('cards')
    // reset({
    //   routes: [{ name: 'postos' }],
    //   index: 0
    // })
  }

  return (
    <S.Container>
      <S.boxImag>
        <Image alt='post banner' source={{ uri: data!.posto.fotoLogo }} h={hightPercent('30')} bg={'gray.300'} />
      </S.boxImag>

      <S.content>
        <ScrollView

        >
          <S.header>
            <HStack alignItems={'center'} space={4} >
              <Image alt='logo' source={{ uri: data?.posto.fotoBandeira }} resizeMode='cover' bg='gray.100' h={9} w={9} />

              <Box w={widtPercent('25')} >
                <S.title style={{ fontSize: _text + 2 }} >{data?.posto.nomePostoApp}</S.title>
                <Center w={widtPercent('8')} bg='green.200' px={2} rounded={'35px'} h={'20px'} >
                  <S.textStatus>{status}</S.textStatus>
                </Center>
              </Box>

            </HStack>

            <HStack alignItems={'center'} space={4} >
              <Center>
                <FontAwesome5 size={20} name='map-marker-alt' color={color.text_color.light} />
                <S.title style={{ marginTop: 5, color: color.text_color.light }} >{km} km</S.title>
              </Center>

            </HStack>

          </S.header>

          <S.line />

          <HStack alignItems={'center'} space={4} >
            <Circle p={4} bg='gray.100' >
              <FontAwesome5 size={18} name='clock' />

            </Circle>

            <Box>
              <S.title style={{ fontFamily: 'bold', fontSize: _text - 1 }} >Horário de funcionamento</S.title>
              <S.text style={{ fontSize: _text - 1 }} >{start}:{min_start} ás {end_hour}:{end_min}</S.text>
            </Box>
          </HStack>

          <S.line />

          <HStack alignItems={'center'} space={4} >
            <Circle p={4} bg='gray.100' >
              <Feather size={18} name='map-pin' />

            </Circle>

            <Box>
              <S.title style={{ fontFamily: 'bold', fontSize: _text - 1 }} >Endereço</S.title>
              <S.text style={{ fontSize: _text - 1 }} >{end}</S.text>
              <S.text style={{ fontSize: _text - 1 }} >{city}</S.text>
            </Box>
          </HStack>

          <S.line />

          <Button onPress={navigation} title='GERAR CARTÃO ABASTECIMENTO' styleType='dark' />

          <S.body>
            <HStack mb={4} space={4} >
              <Box flex={1} >
                <S.text>COMBUSTÍVEL</S.text>
              </Box>

              <Box>
                <S.text>POSTO (R$)</S.text>
              </Box>
              <Box>
                <S.text>MEGA BEM (R$)</S.text>
              </Box>
            </HStack>

            {data?.posto.precosCombustiveis.map(h => (
              <HStack key={h.id} alignItems={'center'} space={4} w={'full'} >
                <Box flex={1}>
                  <S.text style={{ fontFamily: 'semi_bold', fontSize: _text }} >{h.combustivel.tipoCombustivel}</S.text>
                </Box>

                <Box>
                  <S.text style={{ textDecorationLine: 'line-through', fontFamily: 'trin', fontSize: _text }}>{h.precoBomba.toLocaleString('pt-BR')}</S.text>
                </Box>
                <Box alignItems={'flex-end'} w={'85px'}>
                  <Center bg={color.focus.regular} w={'50px'} rounded={8} p={1} >
                    <S.text style={{ color: '#fff', fontFamily: 'bold', fontSize: _text - 1 }} >{h.precoClubGas.toLocaleString('pt-BR')}</S.text>
                  </Center>
                </Box>
              </HStack>

            ))}

          </S.body>

          <Box mt={8} >
            <S.title>OBSERVAÇÕES</S.title>

            <Box ml={4} mt={2} >
              <S.textObos>. Preço sujeito à alteração</S.textObos>
              <S.textObos>. Apresente o cartão Mega Bem antes d abastecer</S.textObos>
              <S.textObos>. 1 avastecimento por dia</S.textObos>
              <S.textObos>. Formas de pagamento: Dinheiro, cartão de débito/crédito e Pix</S.textObos>
            </Box>
          </Box>

          <Button styleType='border' title='LOCALIZAÇÃO' />
        </ScrollView>
      </S.content>

    </S.Container>
  )
}