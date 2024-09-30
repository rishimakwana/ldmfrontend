import { IconButton, Stack, Typography } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'

import { QuantityFieldProps } from './QuantityField.type'
import { MdAdd, MdOutlineRemove } from 'react-icons/md'
import { style } from './QuantityField.style'



export default function QuantityField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: QuantityFieldProps<TFieldValues, TName>): JSX.Element {
  const { control, name, defaultValue = 0 } = props

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as any}
      render={({ fieldState: { error }, field }) => {

        const { ref, value, onChange } = field

        return (
          <Stack direction='row' sx={style.root} ref={ref}>
            <IconButton onClick={_ => onChange(Math.max(value - 1, 0))}>
              <MdOutlineRemove />
            </IconButton>
            <Typography sx={style.quantity}>{value}</Typography>
            <IconButton onClick={_ => onChange(value + 1)}>
              <MdAdd />
            </IconButton>
          </Stack>
        )
      }}
    />
  )
}
