import dynamic from 'next/dynamic'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormHelperText, Box } from '@mui/material'
import 'react-quill/dist/quill.snow.css'

import { TextEditorFieldProps } from './TextEditorField.type'
import { style } from './TextEditorField.style'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })



export default function TextEditorField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: TextEditorFieldProps<TFieldValues, TName>) {
  const { name, control, label, placeholder, helperText, onChange, onBlur, ...restProps } = props


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ fieldState: { error }, field: { ref, ...restField } }) => {
        return (
          <FormControl sx={style.root} error={!!error} className={`${error ? 'error' : ''}`}>

            {/* For error focus */}
            <Box component='button' type='button' ref={ref} sx={style.errorFocusBtn} />

            <ReactQuill
              {...restProps}
              {...restField}
              onChange={(value, delta, source, editor) => {
                restField.onChange(value)
                onChange && onChange(value, delta, source, editor)
              }}
              onBlur={(previousSelection, source, editor) => {
                restField.onBlur()
                onBlur && onBlur(previousSelection, source, editor)
              }}
              // @ts-ignore
              theme='snow'
              placeholder={label || placeholder || 'Write Description...'}
            />
            <FormHelperText>{error ? error?.message : helperText}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}