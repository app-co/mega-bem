import { Home } from '@/pages/Home'
import { HistoricoAbastecimento } from '@/pages/Home/HistoricoAbastecimento'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StakHome() {
  return (
    <Navigator>
      <Screen options={{
        headerShown: false
      }} name="home" component={Home} />
      <Screen name="historico-abasstecimento" component={HistoricoAbastecimento} />
    </Navigator>
  )
}