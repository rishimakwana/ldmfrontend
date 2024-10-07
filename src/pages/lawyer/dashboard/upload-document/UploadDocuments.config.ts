import * as yup from 'yup'
import { fileSizeTest, phoneTest } from '@/utils'


export const schema = yup.object({
  name : yup.string().trim().required().max(300),
  clientId : yup.string().trim().required().max(300),
  email: yup.string().email().trim().required().max(300),
  phone: yup.string().trim().required().min(6).max(11),
  city: yup.string().required().max(300),
  state: yup.string().required().max(300), 
  docs: yup.string().required(), 
  docName: yup.string().required().max(300), 
  file: yup.mixed<File | string>().required().test('required', 'Required *', e => !!e).test('fileSize', 'File size limit is 2 MB', value => fileSizeTest({ value, size: 2 })),
})

export type TSchema = yup.InferType<typeof schema>