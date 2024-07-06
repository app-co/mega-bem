import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NotificationWillDisplayEvent,
  OSNotification,
  OneSignal,
} from 'react-native-onesignal';
import { QueryClientProvider } from 'react-query';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import * as font from '@expo-google-fonts/roboto';

import { NativeBaseProvider } from 'native-base';

import { Notification } from '@/components/Notification';
import { ConnectionErrorModal } from '@/components/modals/connectionErrorModal';
import { UnauthorizedModal } from '@/components/modals/unauthorizedModal';
import { reactotron } from '@/config';
import { AuthProvider } from '@/contexts/auth';
import { queryClient } from '@/lib';
import Routes from '@/routes';
import { NavigationContainer } from '@react-navigation/native';

const key = process.env.EXPO_ONESIGNAL;

OneSignal.initialize(key);
OneSignal.Notifications.requestPermission(true);
export default function App() {
  if (__DEV__) {
    reactotron.connect();
  }

  const [notification, setNotification] = React.useState<OSNotification>();

  const [fontsLoaded] = useFonts({
    trin: font.Roboto_300Light,
    regular: font.Roboto_400Regular,
    italic: font.Roboto_400Regular_Italic,
    semi_bold: font.Roboto_500Medium,
    bold: font.Roboto_700Bold,
    black: font.Roboto_900Black,
  });

  const config = {
    screens: {
      home: {
        screens: {
          Historico: 'Historico',
        },
      },
    },
  };

  const linking = {
    prefixes: ['mega-bem://', ' com.megabem.org://'],
    config,
  };

  React.useEffect(() => {
    function handleNotification(event: NotificationWillDisplayEvent) {
      event.preventDefault();
      const response = event.getNotification();
      setNotification(response);
    }

    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      handleNotification,
    );

    return () => {
      OneSignal.Notifications.removeEventListener(
        'foregroundWillDisplay',
        handleNotification,
      );
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <StatusBar
            // hidden
            translucent
            // backgroundColor={color.focus.regular}
            style="light"
          />
          <NativeBaseProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {notification?.title && (
                <Notification
                  title={notification?.title}
                  data={notification}
                  onClosed={() => setNotification(undefined)}
                />
              )}
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
