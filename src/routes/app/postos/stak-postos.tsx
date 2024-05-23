import { HeaderDetails } from '@/components/HEADERS/HeaderDetails'
import { Details } from '@/pages/Postos/Details'
import { Postos } from '@/pages/Postos/home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Screen, Navigator } = createNativeStackNavigator()

export function StakPost() {
  return (
    <Navigator>
      <Screen options={{
      }} name="Postos" component={Postos} />
      <Screen
        options={{
          title: 'Detalhes do posto',
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
        name="details" component={Details} />
    </Navigator>
  )
}