import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as LocalAuth from 'expo-local-authentication';
import { Box, Center, HStack, Image, useToast } from 'native-base';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import * as S from './styles';
// import { OneSignal } from 'react-native-onesignal';

import {
  checkStorageFaceId,
  removeCredentialsLocal,
  saveCredentialsLocal,
} from './faceId';

import fingerpring from '@/assets/R.png';
import faceId from '@/assets/faceId.png';
import { useAuth } from '@/contexts/auth';
import { LoginFormValues, TLogin } from '@/interfaces';
import { schemaLogin } from '@/schemas';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { AppError } from '@/services/AppError';
import { color } from '@/styles/color';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface I {
  showToast: {
    type: string;
    text1: string;
    text2: string;
  }
  modalizeRef: () => void;
}

export default function LoginTemplate({ showToast, modalizeRef }: I) {

  const control = useForm<TLogin>({
    resolver: zodResolver(schemaLogin),
  })

  const navigation = useNavigation();

  // const { mutateAsync: signIn, isLoading: isSignLoading } = useSignInMutation();

  const { signIn, setRoute, setUser } = useAuth();
  const toast = useToast()

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [permission, setPermission] = React.useState(false);
  const [showModalPermission, setShowModalPermission] = React.useState(false);
  const [valuesForm, setValueForm] = React.useState<LoginFormValues>();
  const [load, setLoad] = React.useState<boolean>(false)

  async function verifyAvaliableAuthentication() {
    const compatible = await LocalAuth.supportedAuthenticationTypesAsync();

    const suportType = compatible.map(h => LocalAuth.AuthenticationType[h]);

    return suportType.length > 0;
  }

  const login = React.useCallback(
    async (values: LoginFormValues) => {
      setLoad(true);
      setShowModalPermission(false);

      try {
        const deviceId = Constants.installationId;

        const payload = { ...values, deviceId };

        signIn(payload);

        // OneSignal.User.addTag('userId', user.usuarioId);

        setLoad(false)
      } catch (error: any) {
        console.log({ login: error })
        if (error instanceof AppError) {

          toast.show({
            title: 'Erro',
            description: error.message,
            bg: color.alert,
            placement: 'top'
          });
        }
        await AsyncStorage.removeItem('smartboi@local-auth');
        setShowModalPermission(false);
        setPermission(false);
      }
    },
    [setRoute, setUser, showToast, signIn],
  );

  const handleActiveLocalAuth = React.useCallback(
    async (values: LoginFormValues) => {
      const verify = await verifyAvaliableAuthentication();
      const localAuth = await checkStorageFaceId();

      if (!localAuth?.permission && verify) {
        await saveCredentialsLocal({
          permission: true,
          email: valuesForm!.email,
          senha: valuesForm!.senha,
        });
      }
      setShowModalPermission(false);
      await login(valuesForm!);
    },
    [login, valuesForm],
  );

  async function localAuth() {
    const localAuth = await checkStorageFaceId();
    if (localAuth?.permission) {
      const auth = await LocalAuth.authenticateAsync({
        promptMessage: 'Login facial',
        fallbackLabel: 'Face Id não reconhecida',
      });

      if (!auth.success) {
        return null;
      }

      if (auth.success) {
        await login({
          email: localAuth.credentials.email,
          senha: localAuth.credentials.senha,
        });
      }
    }
  }

  const handleSignIn = React.useCallback(async (values: TLogin) => {
    const verify = await verifyAvaliableAuthentication();
    const localAuth = await checkStorageFaceId();

    if (!localAuth?.permission && verify) {
      setShowModalPermission(true);
      setValueForm(values);

      return null;
    }

    if (localAuth?.permission) {
      if (localAuth.credentials.email !== values.email) {
        await removeCredentialsLocal();
        setShowModalPermission(true);
        setValueForm(values);

        return null;
      }
      await login(values);
    }
  }, [])


  React.useEffect(() => {
    async function getLocalAuth() {
      const local = await checkStorageFaceId();
      if (local) {
        setPermission(local.permission);
      }
    }
    getLocalAuth();
  }, []);


  function onFocus() {
    if (permission) {
      localAuth();
    }
  }

  async function getCredentials() {
    const credentials = await checkStorageFaceId();

    if (credentials) {
      setPermission(credentials.permission);
    }
  }

  React.useEffect(() => {
    getCredentials();
  }, []);

  return (
    <>

      <Modal visible={showModalPermission} transparent>
        <Center flex={1}>
          <Box bg='gray.400' rounded="2xl" px="8" py="10">
            <Center style={{ gap: 10 }} my="4">
              <Image
                alt="fingerprint"
                source={Platform.OS === 'android' ? fingerpring : faceId}
                style={{ width: 50, height: 70 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: color.focus.dark,
                }}
              >
                Deseja ativar login por{' '}
                {Platform.OS === 'android' ? 'biometria' : 'faceId'}
              </Text>
            </Center>

            <HStack space={4}>
              <TouchableOpacity
                onPress={() => login(valuesForm!)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  width: 130,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#dadada',
                  borderRadius: 4,
                }}
              >
                <Text>Agora não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleActiveLocalAuth(valuesForm!)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: '#fff',
                  width: 130,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: 4,
                }}
              >
                <Text>Ativar</Text>
              </TouchableOpacity>
            </HStack>
          </Box>
        </Center>
      </Modal>

      <S.container>
        <FormInput autoCapitalize='none' keyboardType='email-address' control={control.control} error={control.formState.errors.email} name="email" label="E-mail" />
        <FormInput control={control.control} error={control.formState.errors.senha} secureTextEntry name="senha" label="Senha" />
        <TouchableOpacity onPress={modalizeRef}>
          <S.textForgot>Esqueci a senha</S.textForgot>
        </TouchableOpacity>
        <Button title='ENTRAR' onPress={control.handleSubmit(handleSignIn)} load={load} />
      </S.container>


      {/* <ForgotPasswordModal
        open={isModalVisible}
        corPrimaria={color.text_color.light}
        onCancel={() => setIsModalVisible(!isModalVisible)}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  forgotPassword: {
    paddingVertical: 2,
    fontSize: 12,
    textAlign: 'right',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  loginData: {
    color: '#9D9D9D',
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 16,
    paddingTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
