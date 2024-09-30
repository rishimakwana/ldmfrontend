import * as yup from 'yup'
import { fileSizeTest, passwordTest, phoneTest, stringTest, textEditorRequiredTest } from '@/utils'



export const schema = yup.object({
  text: yup.string().trim().required().max(300).test(stringTest),
  number: yup.number().required().positive().max(1_00_000),
  quantity: yup.number().required().positive().max(0),
  email: yup.string().email().trim().required().max(300),
  phone: yup.string().trim().required().test(phoneTest),
  date: yup.string().required(),
  time: yup.string().required(),
  url: yup.string().url().required().max(300),
  color: yup.string().trim().required(),
  select: yup.string().trim().required(),
  multipleSelect: yup.array().of(yup.number().required()).min(1, 'Required *').required(),
  autocomplete: yup.object({
    id: yup.number().required(),
    label: yup.string().required(),
    year: yup.number().required(),
  }).required(),
  multipleAutocomplete: yup.array().of(
    yup.object({
      id: yup.number().required(),
      label: yup.string().required(),
      year: yup.number().required(),
    }).required()
  ).min(1, 'Required *').required(),
  password: yup.string().trim().required().test(passwordTest(true)).max(100),
  confirmPassword: yup.string().trim().required().oneOf([yup.ref('password')], 'Password and confirm password is different'),
  singleCheckbox: yup.boolean().oneOf([true], ''),
  multipleCheckbox: yup.array().min(1, 'Required *').required(),
  radio: yup.string().required(),
  switch: yup.boolean().oneOf([true], ''),
  image: yup.mixed<File | string>().required().test('required', 'Required *', e => !!e).test('fileSize', 'File size limit is 1 MB', value => fileSizeTest({ value, size: 1 })),
  file: yup.mixed<File | string>().required().test('required', 'Required *', e => !!e).test('fileSize', 'File size limit is 2 MB', value => fileSizeTest({ value, size: 2 })),
  description: yup.string().trim().required().max(10000, 'Explain under 10,000 characters').test('requried', 'Required *', textEditorRequiredTest),
})

export type TSchema = yup.InferType<typeof schema>


export const TOP_FIlMS = [
  { id: 1, label: 'The Shawshank Redemption', year: 1994 },
  { id: 2, label: 'The Godfather', year: 1972 },
  { id: 3, label: 'The Godfather: Part II', year: 1974 },
  { id: 4, label: 'The Dark Knight', year: 2008 },
]


export const FORM_DATA: TSchema = {
  text: 'Dummy Text',
  number: 100,
  quantity: 10,
  email: 'test@gmail.com',
  phone: '+917800154026',
  date: new Date().toISOString(),
  time: new Date().toISOString(),
  url: 'https://mui.com/material-ui/react-skeleton/',
  color: '#6366f1',
  autocomplete: TOP_FIlMS[3],
  multipleAutocomplete: TOP_FIlMS.slice(0, 2),
  select: 'option1',
  multipleSelect: TOP_FIlMS.slice(1, 3).map(item => item.id),
  password: 'test@12345',
  confirmPassword: 'test@12345',
  singleCheckbox: true,
  multipleCheckbox: ['label1'],
  radio: 'radio2',
  switch: true,
  image: 'https://cdn.pixabay.com/photo/2023/03/17/11/39/mountain-7858482_1280.jpg',
  file: 'https://cdn.pixabay.com/photo/2024/03/13/19/06/ai-generated-8631634_1280.jpg',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
}