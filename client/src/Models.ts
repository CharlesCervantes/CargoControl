import { z } from 'zod'

export const VisitorModel = z.object({
  id: z.string(),
  name: z.string(),
  picture_url: z.string(),
  identification: z.string().optional(),
  subject: z.string().optional(),
  company: z.string(),
  badge: z.string().optional(),
  curp: z.string().optional(),
  security_social_number: z.string().optional(),
})

export const EntraceModel = z.object({
  id: z.string(),
  dateTime: z.string(),
  visitor: z.array(VisitorModel).optional(),
})

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  lastname: z.string(),
  name: z.string(),
  numberphone: z.string(),
  password: z.string(),
  roleId: z.string(),
  username: z.string(),
})
