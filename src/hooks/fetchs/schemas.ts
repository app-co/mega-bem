import { z } from "zod";

export const schemaGerarCard = z.object({
  AssociadoId: z.string(),
  Placa: z.string(),
  Cpf: z.string(),
})

export const schemaLogin = z.object({
  email: z.string({ message: '*' }).email('email inválido'),
  senha: z.string({ message: '*' }).min(6, 'mínimo de seis digitos'),
})

export const schemaSingUp = z.object({
  nome: z.string({ message: '*' }),
  email: z.string({ message: '*' }).email('email inválido'),
  senha: z.string({ message: '*' }).min(6, 'mínimo de seis digitos'),
  cpfCnpj: z.string({ message: '*' }).min(6, 'documento inválido'),
  ddd_telefone: z.string({ message: '*' }),
  telefone: z.string({ message: '*' }),
})

export const schemaListPostos = z.object({
  Latitude: z.number(),
  Longitude: z.number(),
})

export const schemaDetailsPostos = z.object({
  idPosto: z.string(),
})

export const schemaGetHistoricoAbastecimento = z.object({
  UsuarioAppId: z.string(),
  Todos: z.boolean().default(false),
  Ultimos7Dias: z.boolean().default(true),
  Ultimos15Dias: z.boolean().default(false),
  Ultimos30Dias: z.boolean().default(false),
  Ultimos90Dias: z.boolean().default(false),
})

export const schemaGetHistoricoPagemento = z.object({
  AssociadoId: z.string(),
})


export type TGerarCartao = z.infer<typeof schemaGerarCard>
export type TListPostos = z.infer<typeof schemaListPostos>
export type TDetailPostos = z.infer<typeof schemaDetailsPostos>
export type TGetHistoricoAbastecimento = z.infer<typeof schemaGetHistoricoAbastecimento>
export type TLogin = z.infer<typeof schemaLogin>
export type TRegisterUser = z.infer<typeof schemaSingUp>
export type TGetHistoricoPagemento = z.infer<typeof schemaGetHistoricoPagemento>