import { HomeHeader } from '@/components/HEADERS/HomeHeader';
import { Home } from '@/pages/Home';
import { HistoricoAbastecimento } from '@/pages/Home/HistoricoAbastecimento';
import { UpdateUser } from '@/pages/Settings/UpdateUser';
import { color } from '@/styles/color';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function StakHome() {
  return (
    <Navigator>
      <Screen
        options={{
          header: () => <HomeHeader />,
          // headerShown: false
        }}
        name="Home"
        component={Home}
      />
      <Screen
        options={{
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#282828',
        }}
        name="historico-abasstecimento"
        component={HistoricoAbastecimento}
      />
      <Screen
        options={{
          title: 'Atualize seu perfil',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'semi_bold',
            fontSize: 20,
            color: color.text_color.global,
          },
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: color.text_color.global,
        }}
        name="profile"
        component={UpdateUser}
      />
    </Navigator>
  );
}
