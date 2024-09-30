import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { ReactQuillProps } from 'react-quill'



export type TextEditorFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  helperText?: string
} & ReactQuillProps