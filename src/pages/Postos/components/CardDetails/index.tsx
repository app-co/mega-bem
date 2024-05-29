import { TextWithLimit } from '@/components/elements/text-with-limit'
import { Button } from '@/components/forms/Button'
import { useAuth } from '@/contexts/auth'
import { IGetPostos } from '@/hooks/fetchs/types'
import { color } from '@/styles/color'
import { _text, widtPercent } from '@/styles/sizes'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getHours } from 'date-fns'
import { Box, Center, HStack, Image } from 'native-base'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import * as S from './styles'

interface I {
  item: IGetPostos
}
export function CardDetails({ item }: I) {
  const { user } = useAuth()
  const modalize = useRef<Modalize>(null)
  const [mor, setMor] = React.useState(2)
  const itens = item.precoCombustivel.slice(0, mor)

  const { navigate } = useNavigation()

  const hour = getHours(new Date(Date.now()))
  const [start_hour, s_] = item.horarioAbertura.split(':').map(Number)
  const [end_hour, e_] = item.horarioFechamento.split(':').map(Number)
  const status = hour > start_hour && hour < end_hour
    ? 'ABERTO'
    : 'FECHADO'



  return (
    <S.Container>

      <S.header>
        <HStack alignItems={'center'} space={4} >
          <Image size='sm' alt='image posto' source={{ uri: item.fotoBandeiraPosto }} />

          <Box>
            <TextWithLimit text={item.postoNome} characterLimit={10} />
            <Center bg={status === 'ABERTO' ? 'green.200' : 'red.300'} px={2} w={widtPercent('8')} rounded={'35px'} h={'20px'} >
              <S.textStatus>{status}</S.textStatus>
            </Center>
          </Box>

        </HStack>

        <HStack alignItems={'center'} space={4} >
          <Center>
            <FontAwesome5 size={20} name='map-marker-alt' color={color.text_color.light} />
            <S.title style={{ marginTop: 5, color: color.text_color.light }} >{item.distancia} km</S.title>
          </Center>
          <TouchableOpacity>

            {mor === 2 ? (
              <TouchableOpacity onPress={() => setMor(item.precoCombustivel.length)}>
                <MaterialIcons size={25} name='keyboard-arrow-down' />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setMor(2)}>
                <MaterialIcons size={25} name='keyboard-arrow-up' />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </HStack>

      </S.header>

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

        {itens.map(h => (
          <HStack key={h.id} alignItems={'center'} space={4} w={'full'} >
            <Box flex={1}>
              <S.text style={{ fontFamily: 'semi_bold', fontSize: _text - 1 }} >{h.titulo}</S.text>
            </Box>

            <Box>
              <S.text style={{ textDecorationLine: 'line-through', fontFamily: 'trin', fontSize: _text }}>{h.precoBomba}</S.text>
            </Box>
            <Box alignItems={'flex-end'} w={'95px'}>
              <Center bg={color.focus.regular} w={'70px'} rounded={8} p={1} >
                <S.text style={{ color: '#fff', fontFamily: 'bold', fontSize: _text - 1 }} >{h.precoClubGas}</S.text>
              </Center>
            </Box>
          </HStack>

        ))}

      </S.body>


      {mor > 2 && (
        <Box mt={4} >
          <Button onPress={() => navigate('details', { idPosto: item.id, km: item.distancia })} style={{ backgroundColor: color.buttonMediun.bg }} title='VER DETALHES' />
          <Button onPress={() => navigate('cards')} styleType='dark' title='GERAR CARTÃO ABASTECIMENTO' />
        </Box>

      )}
    </S.Container>
  )
}