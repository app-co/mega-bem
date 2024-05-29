import { InfoSvg } from '@/assets/svgs/info'
import { ProtectSvg } from '@/assets/svgs/protect'
import { SignOutSvg } from '@/assets/svgs/signOut'
import { WalletSvg } from '@/assets/svgs/walle'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { color } from '@/styles/color'
import { _subtitle } from '@/styles/sizes'
import { EvilIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Box, Circle, HStack } from 'native-base'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useQuery } from 'react-query'
import * as S from './styles'

const fetch = new UseFatch()

export function Settings() {
  const { navigate } = useNavigation()
  const { signOut, user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['get-plano'],
    queryFn: async () => await fetch.getPlanoAssociado({ CpfCnpj: user!.cpfCnpj! }),
  })


  if (isLoading) return <Loading />
  return (
    <S.Container>
      <ScrollView style={{ backgroundColor: '#fff' }} >
        <S.box style={{ marginBottom: 20 }} >
          <HStack space={4} alignItems={'center'} >
            {user?.fotoUrl ? (
              <Avatar size={'lg'} source={{ uri: user?.fotoUrl }} />

            ) : (
              <EvilIcons name='user' size={65} color={color.focus.ligh} />
            )}

            <Box flex={1} >
              <S.title style={{ fontFamily: 'bold', fontSize: _subtitle }} >{user!.nome}</S.title>
              <S.title>PLACA: {user?.placas[0]}</S.title>
            </Box>

            <TouchableOpacity onPress={() => navigate('profile')} >
              <Feather size={20} name='edit' />
            </TouchableOpacity>
          </HStack>
        </S.box>

        {data?.dataVigente && (
          <S.box>
            <S.row>
              <WalletSvg fill={color.focus.ligh} />
              <Box ml={4} flex={1} >
                <S.title style={{ fontFamily: 'regular' }} >PLANO CONTRATADO</S.title>
                <S.title style={{ fontFamily: 'bold' }} >{data?.nomePlano}</S.title>
              </Box>

              <Feather name='help-circle' size={20} />
            </S.row>
            <S.row style={{ gap: 10, justifyContent: 'space-between' }} >
              <S.title>DATA VIGENTE</S.title>
              <S.title>{data?.dataVigente}</S.title>
            </S.row>
            <S.row style={{ gap: 10, justifyContent: 'space-between' }} >
              <S.title>VALOR MENSAL</S.title>
              <S.title
                style={{
                  fontFamily: 'bold',
                  color: '#36c24b',
                  fontSize: _subtitle
                }} >
                {data?.valor.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </S.title>
            </S.row>
          </S.box>

        )}

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