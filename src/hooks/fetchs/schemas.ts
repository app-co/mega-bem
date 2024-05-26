import { z } from "zod";

export const schemaGerarCard = z.object({
  AssociadoId: z.string().nullable(),
  Placa: z.string(),
  Cpf: z.string(),
})

export const schemaLogin = z.object({
  email: z.string({ message: '*' }).email('email inválido'),
  senha: z.string({ message: '*' }).min(6, 'mínimo de seis digitos'),
})

export const schemaSingUp = z.object({
  nomeCompleto: z.string({ message: '*' }),
  email: z.string({ message: '*' }).email('email inválido'),
  senha: z.string({ message: '*' }).min(6, 'mínimo de seis digitos'),
  cpf: z.string({ message: '*' }).min(6, 'documento inválido'),
  foto: z.string({ message: '*' }).optional(),
  ddd: z.string({ message: '*' }),
  fone: z.string({ message: '*' }),
  dataNacimento: z.string({ message: '*' }),
})

export const schemaListPostos = z.object({
  Latitude: z.number(),
  Longitude: z.number(),
})

export const schemaDetailsPostos = z.object({
  idPosto: z.string(),
  km: z.number().optional(),
})

export const schemaGetHistoricoAbastecimento = z.object({
  Todos: z.boolean().default(false),
  Ultimos7Dias: z.boolean().default(true),
  Ultimos15Dias: z.boolean().default(false),
  Ultimos30Dias: z.boolean().default(false),
  Ultimos90Dias: z.boolean().default(false),
  CpfCnpj: z.string(),
  Placa: z.string().optional()
})

export const schemaGetHistoricoPagemento = z.object({
  AssociadoId: z.string(),
})

export const schemaPlanoAssociado = z.object({
  CpfCnpj: z.string(),
})

export const schemaUpdateUser = z.object({
  nomeCompleto: z.string(),
  foto: z.string(),
  usuarioId: z.string(),
  email: z.string(),
  senha: z.string().optional(),
})

export type TGerarCartao = z.infer<typeof schemaGerarCard>
export type TListPostos = z.infer<typeof schemaListPostos>
export type TDetailPostos = z.infer<typeof schemaDetailsPostos>
export type TGetHistoricoAbastecimento = z.infer<typeof schemaGetHistoricoAbastecimento>
export type TLogin = z.infer<typeof schemaLogin>
export type TRegisterUser = z.infer<typeof schemaSingUp>
export type TGetHistoricoPagemento = z.infer<typeof schemaGetHistoricoPagemento>
export type TPlanoAssociado = z.infer<typeof schemaPlanoAssociado>
export type TUpdateUser = z.infer<typeof schemaUpdateUser>