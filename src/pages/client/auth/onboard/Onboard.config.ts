import * as yup from 'yup'
import { phoneTest } from '@/utils'


export const schema = yup.object({
  email: yup.string().email().trim().required().max(300),
  phone: yup.string().trim().required().test(phoneTest),
})

export type TSchema = yup.InferType<typeof schema>