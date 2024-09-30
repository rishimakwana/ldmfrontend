import { Control, FieldPath, FieldValues } from 'react-hook-form'



export type ImageFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>
  helperText?: string
  label?: string
  placeholder?: string
  description?: string
}