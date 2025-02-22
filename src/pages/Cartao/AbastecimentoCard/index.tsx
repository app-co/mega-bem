import React from 'react';
import { useForm } from 'react-hook-form';

import { Box } from 'native-base';
import { z } from 'zod';

import { WalletBarSvg } from '@/assets/svgs/wallet-bar';
import { SemPlaca } from '@/components/templates/SemPlaca';
import { VariasPlaca } from '@/components/templates/VariasPlaca';
import { useAuth } from '@/contexts/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';

interface I {
  setPlaca: (h: string) => void;
  setCpf: (h: string) => void;
}

const schema = z.object({
  placa: z.string({ message: '* obrigatório' }).min(7, 'Placa inválida'),
  cpfCnpj: z.string({ message: '* obrigatório' }),
});
type T = z.infer<typeof schema>;

export function AbastecimentoCard({ setPlaca, setCpf }: I) {
  const { user } = useAuth();
  const [placa, setSelectPlaca] = React.useState('');

  const control = useForm<T>({
    resolver: zodResolver(schema),
  });

  // const placas =
  //   user?.placas && user.placas.length > 1
  //     ? user.placas.map(h => {
  //       return {
  //         label: h,
  //         value: h,
  //       };
  //     })
  //     : null;

  function submit(input: T) {
    setPlaca(input.placa);
    setCpf(input.cpfCnpj);
  }

  const placas = user!.placas.map(h => {
    return {
      label: h,
      value: h,
    };
  });

  const typeAcessComponent: any = {
    'sem-placa': (
      <SemPlaca
        text="GERAR CARTÃO DE ABASTECIMENTO"
        control={control}
        submit={control.handleSubmit(submit)}
        ico={<WalletBarSvg size={80} fill="#fff" />}
      />
    ),
    'varias-placa': (
      <VariasPlaca
        text="GERAR CARTÃO DE ABASTECIMENTO"
        itens={placas}
        selectedPlaca={h => setPlaca(h)}
        ico={<WalletBarSvg size={80} fill="#fff" />}
      />
    ),
  };

  const typeAcess = React.useMemo(() => {
    let acess = 'sem-placa';

    if (placas.length === 0) {
      acess = 'sem-placa';
      return acess;
    }

    if (placas.length > 1) {
      acess = 'varias-placa';
      return acess;
    }

    if (placas.length === 1) {
      acess = 'uma-placa';
      return acess;
    }

    return acess;
  }, [user]);

  return (
    <S.Container>
      <Box>{typeAcessComponent[typeAcess]}</Box>
    </S.Container>
  );
}
