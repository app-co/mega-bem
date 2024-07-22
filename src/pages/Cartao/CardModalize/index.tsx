import { ActivityIndicator } from 'react-native';

import { Box, Center, HStack } from 'native-base';

import { Logo } from '@/assets/svgs/logo';
import { LogoIco } from '@/assets/svgs/logo-ico';
import { WalletBarSvg } from '@/assets/svgs/wallet-bar';
import { useAuth } from '@/contexts/auth';
import { IVirtualCard } from '@/hooks/fetchs/types';
import { color } from '@/styles/color';
import { _title } from '@/styles/sizes';

import * as S from './styles';

interface I {
  item: IVirtualCard | undefined;
  load: boolean;
  pres: () => void;
}
export function VirtualCard({ pres, item, load }: I) {
  const { user } = useAuth();

  const [nome, sobrenome] = user!.nome.split(' ').map(String);

  return (
    <S.Container onPress={pres} disabled={!!item?.placa}>
      <S.card
        colors={[color.focus.regular, '#4448b0', color.focus.regular]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <HStack alignItems="center" mb={4} justifyContent="space-between">
          <Box flex={1}>
            <Logo width={100} height={50} />
          </Box>
          {item?.placa && (
            <S.title style={{ color: '#fff' }}>Placa: {item?.placa}</S.title>
          )}
        </HStack>

        {load ? (
          <Center h="110px">
            <ActivityIndicator color="#fff" size={35} />
          </Center>
        ) : (
          <Center>
            {item?.placa ? (
              <>
                <S.cod>{item?.codCartao}</S.cod>
                <LogoIco />

                <HStack
                  alignItems="flex-end"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box>
                    <S.text style={{ color: '#fff' }}>
                      VÁLIDO ATÉ {item?.dataValidade}
                    </S.text>
                    <S.textBold style={{ color: '#fff' }}>
                      {nome} {sobrenome}
                    </S.textBold>
                  </Box>

                  <S.text style={{ color: '#fff' }}>{item?.nomeGrupo}</S.text>
                </HStack>
              </>
            ) : (
              <Center>
                <WalletBarSvg size={80} fill="#fff" />
                <S.title
                  style={{
                    color: '#fff',
                    marginBottom: 20,
                    fontSize: _title + 5,
                  }}
                >
                  Gerar cartão virtual
                </S.title>
              </Center>
            )}
          </Center>
        )}
      </S.card>
    </S.Container>
  );
}
