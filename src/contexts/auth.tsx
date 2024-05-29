import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
// import { OneSignal } from 'react-native-onesignal';
import * as mutation from '@/hooks/mutations';


import { UseFatch } from '@/hooks/fetchs';
import { TLogin } from '@/hooks/fetchs/schemas';
import { IUser } from '@/hooks/fetchs/types';
import {
  AuthContextData,
  InfoInterface
} from '@/interfaces';
import { useToast } from 'native-base';

interface AuthProviderProps {
  children: ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const fetch = new UseFatch()

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { reset } = useNavigation();
  const { isLoading, mutateAsync: login, data: response } = mutation.login()

  const toast = useToast()

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShowChangeAccount, setIsShowChangeAccount] = useState(false);
  const [route, setRoute] = useState(3);
  const [info, setInfo] = useState<InfoInterface | null>(null);

  const updateUser = React.useCallback(async (usuarioId: string) => {
    const user = await fetch.getUserByID({ usuarioId })

    console.log({ upd: user })
  }, [])

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
    const auth = await fetch.signIn(input) as IUser

    setUser(auth)
    await AsyncStorage.setItem('@megabem:token', JSON.stringify(auth.accessToken))
    await AsyncStorage.setItem('@megabem:user', JSON.stringify(auth))
  }, [])


  function signOut() {
    setLoading(true);
    setIsShowChangeAccount(false);

    // OneSignal.User.removeTag('userId');
    const localAuth = AsyncStorage.getItem('megabem@local-auth').then(h =>
      h ? JSON.parse(h) : null,
    );
    AsyncStorage.clear().then(() => {
      setUser(null);
    });

    localAuth.then(async h => {
      await AsyncStorage.setItem('megabem@local-auth', JSON.stringify(h));
    });
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        updateUser,
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
