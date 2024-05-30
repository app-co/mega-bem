import { HeaderDetails } from '@/components/HEADERS/HeaderDetails'
import { Cartao } from '@/pages/Cartao'
import { Details } from '@/pages/Postos/Details'
import { Postos } from '@/pages/Postos/home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Screen, Navigator } = createNativeStackNavigator()

export function StakPost() {
  return (
    <Navigator
      initialRouteName='Postos'
    >
      <Screen name="Postos" component={Postos} />
      <Screen
        listeners={{}}
        options={{

          title: 'Detalhes',
          header: (props) => <HeaderDetails />,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'semi_bold',
            fontSize: 20,
            color: '#ffffff',
          },
          headerBackTitleVisible: false,
          headerBackTitle: 'details',
          headerStyle: {
            backgroundColor: '#ce222200',
          },
          headerTintColor: '#d7d7d7',
        }}
        name="details" component={Details}
      />

      <Screen
        options={{
          title: 'Cartões',
        }}
        name="cards" component={Cartao}
      />
    </Navigator>
  )
}