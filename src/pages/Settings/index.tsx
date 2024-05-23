import { InfoSvg } from '@/assets/svgs/info'
import { ProtectSvg } from '@/assets/svgs/protect'
import { SignOutSvg } from '@/assets/svgs/signOut'
import { WalletSvg } from '@/assets/svgs/walle'
import { useAuth } from '@/contexts/auth'
import { color } from '@/styles/color'
import { _subtitle } from '@/styles/sizes'
import { EvilIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Box, Circle, HStack } from 'native-base'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import * as S from './styles'

export function Settings() {
  const { navigate } = useNavigation()
  const { signOut, user } = useAuth()
  return (
    <S.Container>
      <ScrollView>
        <S.box style={{ marginBottom: 20 }} >
          <HStack space={4} alignItems={'center'} >
            {user?.fotoUrl ? (
              <Avatar size={'lg'} source={{ uri: user?.fotoUrl }} />

            ) : (
              <EvilIcons name='user' size={65} color={color.focus.ligh} />
            )}

            <Box flex={1} >
              <S.title style={{ fontFamily: 'bold', fontSize: _subtitle }} >{user!.nome}</S.title>
              <S.title>PLACA: b435b</S.title>
            </Box>

            <TouchableOpacity>
              <Feather size={20} name='edit' />
            </TouchableOpacity>
          </HStack>
        </S.box>

        <S.box>
          <S.row>
            <WalletSvg />
            <Box ml={4} flex={1} >
              <S.title style={{ fontFamily: 'regular' }} >PLANO CONTRATADO</S.title>
              <S.title>Settings</S.title>
            </Box>

            <Feather name='help-circle' />
          </S.row>
          <S.row>
            <S.title>DATA VIGENTE</S.title>
            <S.title>12/02/24 até 12/08/24</S.title>
          </S.row>
          <S.row>
            <S.title>VALOR MENSAL</S.title>
            <S.title
              style={{ fontFamily: 'bold', color: '#36c24b' }} >R$ 120,00</S.title>
          </S.row>
        </S.box>

        <S.title style={{ marginVertical: 20, fontSize: _subtitle, color: color.text_color.global }} >Configurações</S.title>

        <S.content>
          <TouchableOpacity onPress={() => navigate('historico-pagamento')} >
            <HStack space={6} alignItems={'center'} >
              <Circle bg={color.focus.extr_light} p={3} >
                <Feather size={16} name='edit' color={color.focus.ligh} />
              </Circle>

              <Box>
                <S.title>Histórico de Pagamentos</S.title>
                <S.title>Veja o histórico de faturas do plano contratado</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />

          <TouchableOpacity>
            <HStack space={6} alignItems={'center'} >
              <Circle bg={color.focus.extr_light} p={3} >
                <InfoSvg />
              </Circle>

              <Box>
                <S.title>Ajuda</S.title>
                <S.title>Caso precise de ajuda, tire suas dúvidas aqui</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />

          <TouchableOpacity>
            <HStack space={6} alignItems={'center'} >
              <Circle bg={color.focus.extr_light} p={3} >
                <ProtectSvg />
              </Circle>

              <Box>
                <S.title>Termos de Uso e Privacidade</S.title>
                <S.title>Conheça as nossas políticas</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />

          <TouchableOpacity onPress={() => signOut()} >
            <HStack space={6} alignItems={'center'} >
              <Circle bg={color.focus.extr_light} p={4} >
                <SignOutSvg />
              </Circle>

              <Box>
                <S.title>Sair</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />
        </S.content>

      </ScrollView>
    </S.Container>
  )
}