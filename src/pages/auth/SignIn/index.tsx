import logo from '@/assets/logo.png';
import * as Constant from 'expo-constants';
import React, { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native';
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView
} from 'react-native-tab-view';
import Toast from 'react-native-toast-message';

import LoginTemplate from '@/components/templates/loginTemplate';

import { ForgotPassword } from '@/components/modals/modalSheet/fongot-password';
import { RegisterTemplate } from '@/components/templates/RegisterTemplate';
import { useAuth } from '@/contexts/auth';
import { color } from '@/styles/color';
import { hightPercent, widtPercent } from '@/styles/sizes';
import { Image } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize';
import * as S from './styles';


export default function SignIn() {
  const modalizeRef = useRef<Modalize>(null);
  const { loading } = useAuth()
  const [openSheet, setOpenSheet] = React.useState(false)

  const buildVersion = Constant.default.nativeAppVersion;

  // const { data, isLoading } = useSignInQuery();

  const layout = useWindowDimensions();

  const [activeTab, setActiveTab] = useState('login');

  const routes = useMemo(
    () => [
      { key: 'login', title: 'Login' },
      { key: 'register', title: 'Cadastrar' },
    ],
    []
  );

  const LoginRoute = () => (
    <LoginTemplate
      showToast={showToast}
      modalizeRef={() => modalizeRef.current?.open()}
    />
  );

  const RegisterRoute = () => (
    <RegisterTemplate />
  );

  const renderScene = SceneMap({
    login: LoginRoute,
    register: RegisterRoute,
  });

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={color.focus.regular}
      inactiveColor={color.text_color.light}
      style={{ marginTop: 5, backgroundColor: 'transparent', elevation: 0 }}
      // pressColor={color.focus.regular}
      renderIndicator={renderIndicator}
      renderLabel={({ route, focused, color }) => (
        <S.title style={{ color, fontFamily: focused ? 'bold' : 'trin' }} >{route.title}</S.title>
      )}
    />

  );

  const renderIndicator = (props: any) => (
    <TabBarIndicator
      {...props}
      style={{
        backgroundColor: color.focus.regular,
        height: 3,
        width: 30,
        alignSelf: 'center',
        marginLeft: '21%'
      }}
    />
  );

  function openModal(enent: any) {
    enent.persist()
    modalizeRef.current?.open()
  }


  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#999999" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={300}
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: color.focus.regular,
        },
      ]}
    >
      <View style={{ zIndex: 3 }}>
        <Toast />
      </View>

      <ForgotPassword modalizeRef={modalizeRef} />


      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >

        <Image w={widtPercent('42')} h={hightPercent('8')} source={logo} alt='logo' />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={styles.containerForm}
      >
        <TabView
          navigationState={{ index: activeTab === 'login' ? 0 : 1, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={index =>
            setActiveTab(index === 0 ? 'login' : 'register')
          }

          initialLayout={{ width: layout.width }}
        />
        {/* <Text>{buildVersion}</Text> */}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  containerHeader: {
    backgroundColor: color.focus.regular,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '8%',
    fontFamily: 'dark',

  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 3,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
  },
  icon: {
    overflow: 'hidden',
    borderRadius: 15,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: 300,
    height: 100,
  },
});
