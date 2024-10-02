import { passwordTest } from '@/utils'
import * as yup from 'yup'


export const schema = yup.object({
  password: yup.string().trim().required().test(passwordTest(false)).max(100),
  confirmPassword: yup.string().trim().required().oneOf([yup.ref('password')], 'Password and confirm password is different'),


})

export type TSchema = yup.InferType<typeof schema>