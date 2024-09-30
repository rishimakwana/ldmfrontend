import * as yup from 'yup'
import { passwordTest, phoneTest, stringTest } from '@/utils'



export const schema = yup.object({
  customerOrganizationTypeId: yup.number().required(),
  customerOrganizationName: yup.string().trim().required().max(300),
  firstName: yup.string().trim().required().max(150).test(stringTest),
  lastName: yup.string().trim().required().max(150),
  phone: yup.string().trim().required().test(phoneTest),
  email: yup.string().email().trim().required().max(300),
  countryId: yup.number().required(),
  password: yup.string().trim().required().test(passwordTest(true)).max(100),
  confirmPassword: yup.string().trim().required().oneOf([yup.ref('password')], 'Password and confirm password is different'),
})

export type TSchema = yup.InferType<typeof schema>