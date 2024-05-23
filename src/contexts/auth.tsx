import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
// import { OneSignal } from 'react-native-onesignal';
import * as mutation from '@/hooks/mutations';


import { TLogin } from '@/hooks/fetchs/schemas';
import { ILoginUser } from '@/hooks/fetchs/types';
import {
  AuthContextData,
  InfoInterface
} from '@/interfaces';
import { AppError } from '@/services/AppError';
import { useToast } from 'native-base';

interface AuthProviderProps {
  children: ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { reset } = useNavigation();
  const { isLoading, mutateAsync: login, data: response } = mutation.login()

  const toast = useToast()

  const [user, setUser] = useState<ILoginUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShowChangeAccount, setIsShowChangeAccount] = useState(false);
  const [route, setRoute] = useState(3);
  const [info, setInfo] = useState<InfoInterface | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);
      const storageUser = await AsyncStorage.getItem('@megabem:user');
      const storageToken = await AsyncStorage.getItem('@megabem:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const signIn = React.useCallback(async (input: TLogin) => {
    try {
      const auth = await login(input) as ILoginUser

      const user = {
        nome: auth.nome,
        email: auth.email,
        usuarioId: auth.usuarioId,
        associadoId: auth.associadoId,
        enumNivel: auth.enumNivel,
        fotoUrl: auth.fotoUrl,
        errors: auth.errors,
        isValid: auth.isValid,
      }

      setUser(user)
      await AsyncStorage.setItem('@megabem:token', JSON.stringify(auth.accessToken))
      await AsyncStorage.setItem('@megabem:user', JSON.stringify(user))

    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Erro',
          description: error.message,
          bg: 'red.500',
          placement: 'top'
        });
      }
    }
  }, [])


  function signOut() {
    setLoading(true);
    setIsShowChangeAccount(false);

    // OneSignal.User.removeTag('userId');
    const localAuth = AsyncStorage.getItem('connect@local-auth').then(h =>
      h ? JSON.parse(h) : null,
    );
    AsyncStorage.clear().then(() => {
      setUser(null);
    });

    localAuth.then(async h => {
      await AsyncStorage.setItem('connect@local-auth', JSON.stringify(h));
    });
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signed: !!user,
        route,
        setRoute,
        user,
        setUser,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
