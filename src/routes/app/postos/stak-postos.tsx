import { Cartao } from '@/pages/Cartao';
import { Details } from '@/pages/Postos/Details';
import { Postos } from '@/pages/Postos/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function StakPost() {
  return (
    <Navigator initialRouteName="Postos">
      <Screen
        options={{ title: 'Postos' }}
        name="stakPostos"
        component={Postos}
      />
      <Screen
        listeners={{}}
        options={{
          headerShown: false,
        }}
        name="details"
        component={Details}
      />

      <Screen
        options={{
          title: 'Cartões',
        }}
        name="cards"
        component={Cartao}
      />
    </Navigator>
  );
}
