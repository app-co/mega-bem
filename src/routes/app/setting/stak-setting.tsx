import { Settings } from '@/pages/Settings'
import { HistoricoPayment } from '@/pages/Settings/HistoricoPayment'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StakSetting() {
  return (
    <Navigator>
      <Screen options={{
        title: 'Configurações',
        headerShown: true,
      }} name="setting" component={Settings}
      />
      <Screen
        options={{
          title: 'Detalhes do posto',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'semi_bold',
            fontSize: 20,
            color: '#ffffff',
          },
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#d7d7d7',
        }}
        name="historico-pagamento" component={HistoricoPayment} />
    </Navigator>
  )
}