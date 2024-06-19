import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';

import { Servicos } from './components/Servicos';
import * as S from './styles';

export function Home() {
  const modalizeRef = useRef<Modalize>(null);

  return (
    <S.Container>
      {/* <HomeHeader /> */}
      <Servicos modalize={() => modalizeRef.current?.open()} />
    </S.Container>
  );
}
