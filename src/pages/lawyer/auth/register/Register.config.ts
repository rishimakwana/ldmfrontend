import * as yup from 'yup'
import { passwordTest, phoneTest, stringTest } from '@/utils'

export const schema = yup.object({
  fullName: yup.string().trim().required().max(150).test(stringTest),
  gender: yup.string().trim().required(),
  phone: yup.string().trim().required().test(phoneTest),
  email: yup.string().email().trim().required().max(300),
  password: yup.string().trim().required().test(passwordTest(true)).max(100).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, 'Password must contain at least 1 uppercase, 1 lowercase, and 1 digit'),
  confirmPassword: yup.string().trim().required().oneOf([yup.ref('password')], 'Password and confirm password is different'),
  drivingLicenseFront: yup.mixed().required(),
  drivingLicenseBack: yup.mixed().required(),
  firmName: yup.string().required().max(150).test(stringTest),
  streetAddress: yup.string().required().max(250).test(stringTest),
  city: yup.string().required(),
  zipCode: yup.string().required(),
  state: yup.string().required(),
  otp: yup.string().required().length(6, 'OTP must be 6 digits'),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
})

export type TSchema = yup.InferType<typeof schema>