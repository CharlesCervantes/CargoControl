import nodemailer from 'nodemailer'
import { env } from '../env'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: env.MAIL_ACCOUNT,
    pass: env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: env.REJECT_UNAUTHORIZED,
  },
})
