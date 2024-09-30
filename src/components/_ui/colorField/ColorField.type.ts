import { Control, FieldPath, FieldValues } from 'react-hook-form'



export type ColorFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>,
  label?: string
  helperText?: string
}