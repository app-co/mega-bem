import { Settings } from '@/pages/Settings'
import { HistoricoPayment } from '@/pages/Settings/HistoricoPayment'
import { UpdateUser } from '@/pages/Settings/UpdateUser'
import { color } from '@/styles/color'
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
            color: color.text_color.global,
          },
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: color.text_color.global,
        }}
        name="historico-pagamento" component={HistoricoPayment} />

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
        name="profile" component={UpdateUser} />
    </Navigator>
  )
}