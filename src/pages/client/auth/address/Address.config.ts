import * as yup from 'yup'



export const schema = yup.object({
  state : yup.string().trim().required(),
  street : yup.string().trim().required(),
  zipcode: yup.number().required(),
  city: yup.string().required(),
})

export type TSchema = yup.InferType<typeof schema>