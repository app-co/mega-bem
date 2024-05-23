import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginFormValues } from '@/interfaces';
interface ILocalAuth {
  credentials: { email: string; senha: string };
  permission: boolean;
}

export async function checkStorageFaceId() {
  const check = await AsyncStorage.getItem('smartboi@local-auth');
  const data = check ? (JSON.parse(check) as ILocalAuth) : null;

  return data;
}

export async function saveCredentialsLocal(input: LoginFormValues) {
  const data = {
    permission: input.permission,
    credentials: {
      email: input.email,
      senha: input.senha,
    },
  };

  await AsyncStorage.setItem('smartboi@local-auth', JSON.stringify(data));
}

export async function removeCredentialsLocal() {
  await AsyncStorage.removeItem('smartboi@local-auth');
}
