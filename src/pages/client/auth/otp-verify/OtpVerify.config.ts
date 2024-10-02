import * as yup from 'yup';

export const schema = yup.object({
  otp: yup
    .number()
    .required('OTP is required')
});

export type TSchema = yup.InferType<typeof schema>;
