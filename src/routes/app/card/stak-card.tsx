import { Cartao } from '@/pages/Cartao';
import { AbastecimentoCard } from '@/pages/Cartao/AbastecimentoCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function StakCards() {
  return (
    <Navigator>
      <Screen
        options={{
          title: 'Cartões',
        }}
        name="cards"
        component={Cartao}
      />

      {/* <Screen
        options={{
          title: 'Cartão Virtual',
          headerShown: true,
        }}
        name="virtualCard"
        component={VirtualCard}
      /> */}

      <Screen
        options={{
          title: 'Cartão Abastecimento',
        }}
        name="abastecimentoCard"
        component={AbastecimentoCard}
      />
    </Navigator>
  );
}
