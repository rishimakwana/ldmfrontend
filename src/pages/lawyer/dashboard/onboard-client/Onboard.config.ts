import * as yup from 'yup'
import { phoneTest } from '@/utils'


export const schema = yup.object({
  fullName : yup.string().trim().required().max(300),
  email: yup.string().email().trim().required().max(300),
  phone: yup.string(),
})

export type TSchema = yup.InferType<typeof schema>