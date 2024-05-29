import { HomeHeader } from '@/components/HEADERS/HomeHeader'
import { Home } from '@/pages/Home'
import { HistoricoAbastecimento } from '@/pages/Home/HistoricoAbastecimento'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StakHome() {
  return (
    <Navigator>
      <Screen options={{
        header: () => <HomeHeader />,
        // headerShown: false
      }} name="Home" component={Home} />
      <Screen
        options={{
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#282828',
        }}
        name="historico-abasstecimento" component={HistoricoAbastecimento} />
    </Navigator>
  )
}