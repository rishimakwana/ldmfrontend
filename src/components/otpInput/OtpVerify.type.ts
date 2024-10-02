import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type OtpInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>
  numInputs: number
} & React.HTMLAttributes<HTMLInputElement>