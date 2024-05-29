import 'react-native-gesture-handler';

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import { ConnectionErrorModal } from '@/components/modals/connectionErrorModal';
import { UnauthorizedModal } from "@/components/modals/unauthorizedModal";
import { reactotron } from '@/config';
import { AuthProvider } from "@/contexts/auth";
import { queryClient } from "@/lib";
import Routes from "@/routes";
import { color } from '@/styles/color';
import * as font from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "react-query";

export default function App() {

  if (__DEV__) {
    reactotron.connect();
  }


  const [fontsLoaded] = useFonts({
    trin: font.Roboto_300Light,
    regular: font.Roboto_400Regular,
    semi_bold: font.Roboto_500Medium,
    bold: font.Roboto_700Bold,
    black: font.Roboto_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor={color.focus.regular} style="light" />
          <NativeBaseProvider>
            <GestureHandlerRootView style={{ flex: 1 }} >
              <Routes />
            </GestureHandlerRootView>
          </NativeBaseProvider>
          <UnauthorizedModal />
          <ConnectionErrorModal />
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
