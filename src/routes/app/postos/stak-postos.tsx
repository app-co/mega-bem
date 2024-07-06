/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { Header } from '@/components/HEADERS/Header';
import { Cartao } from '@/pages/Cartao';
import { Details } from '@/pages/Postos/Details';
import { Postos } from '@/pages/Postos/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function StakPost() {
  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}
      initialRouteName="stakPostos"
    >
      <Screen
        options={{ title: 'Postos', headerShown: false }}
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
          title: '',
        }}
        name="cards"
        component={Cartao}
      />
    </Navigator>
  );
}
