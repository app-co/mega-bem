import { z } from 'zod';

import { IUser } from '@/hooks/fetchs/types';
import {
  schemaLogin,
  schemaRegisterBuyer,
  schemaRegisterUser,
} from '@/schemas';

export interface LoginFormValues {
  email: string;
  senha: string;
  permission?: boolean;
}

export interface User { }

export interface RegisterFormValues { }

export interface InfoInterface {
  type: string;
  text1: string;
  text2: string;
}

export interface AuthContextData {
  signed: boolean;
  route: number;
  setRoute: (value: number) => void;
  user: IUser | null;
  setUser: (value: IUser | null) => void;
  signIn: (input: LoginFormValues) => void;
  loading: boolean;
  signOut(): void;
  updateUser(user: IUser): void;
}

export interface DeleteCustomerValues {
  usuarioId: string;
}

export interface DeleteAccountModalProps {
  open: boolean;
  onCancel: () => void;
}

export interface ForgotPasswordModalProps {
  open: boolean;
  corPrimaria: string;
  onCancel: () => void;
}

export type TRegisterBuyerUser = z.infer<typeof schemaRegisterBuyer>;
export type TLogin = z.infer<typeof schemaLogin>;
export type TRegisterUser = z.infer<typeof schemaRegisterUser>;
