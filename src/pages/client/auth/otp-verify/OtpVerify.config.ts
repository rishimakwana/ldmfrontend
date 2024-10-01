import * as yup from 'yup';

export const schema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be exactly 6 digits')
    .matches(/^\d+$/, 'OTP must contain only numbers') 
});

export type TSchema = yup.InferType<typeof schema>;
