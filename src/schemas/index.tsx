import * as Yup from 'yup';
import { z } from 'zod';

export function CreateValidationSchemas() {

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('email enválido')
      .required('email obrigatório'),
    senha: Yup.string()
      .min(6, 'mínimo 6 digitos')
      .required('schemas.required'),
  });

  const QuickMessageValidationSchema = Yup.object().shape({
    titulo: Yup.string().required('schemas.required'),
    mensagem: Yup.string().required('schemas.required'),
  });

  const ForgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('schemas.email')
      .required('schemas.required'),
  });



  return {
    LoginValidationSchema,
    QuickMessageValidationSchema,
    ForgotPasswordValidationSchema,
  };
}

export default CreateValidationSchemas;

export const schemaRegisterBuyer = z.object({
  email: z.string().email(),
  senha: z.string(),
  nomeCompleto: z.string(),
  telefone: z.string(),
  cpf: z.string(),
  deviceId: z.string(),
  tipoUsuario: z.number()
})
export const schemaRegisterUser = z.object({
  email: z.string({ message: '*' }).email('email inválido'),
  senha: z.string({ message: '*' }).min(6, 'mínimo de 6 digitos'),
  nomeCompleto: z.string({ message: '*' }),
  telefone: z.string({ message: '*' }),
  cpf: z.string({ message: '*' }),
})


export const schemaLogin = z.object({
  email: z.string().email('email inválido'),
  senha: z.string().min(6, 'mínimo de seis digitos'),
})
