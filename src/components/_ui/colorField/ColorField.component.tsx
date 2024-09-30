import { useState } from 'react'
import { ButtonBase, Stack, useTheme, Box, TextField } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { MdAdd, MdCheck } from 'react-icons/md'

import { ColorFieldProps } from './ColorField.type'
import { style } from './ColorField.style'



export default function ColorField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: ColorFieldProps<TFieldValues, TName>): JSX.Element {
  const { control, name, label, helperText } = props
  const theme = useTheme()
  const DEFAULT_COLORS = [theme.palette.primary.main, '#f44336', '#009688', '#4b168a']
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS)


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ fieldState: { error }, field: { ref, value, onChange } }) => {

        if (value && !colors.includes(value)) setColors(items => { items[DEFAULT_COLORS.length] = value; return items })

        const handleChange = (color: string) => {
          onChange(color)
        }

        return (
          <TextField
            label={label ?? 'Select theme color *'}
            value={value}
            inputRef={ref}
            error={!!error}
            sx={style.root}
            tabIndex={-1}
            inputProps={{ tabIndex: -1 }}
            helperText={error ? error?.message : helperText}
            InputProps={{
              readOnly: true,
              endAdornment: <>
                <Stack sx={style.themeColorBoxContainer}>
                  {colors.map((item, index) =>
                    <ButtonBase sx={{ ...style.themeColorBox, bgcolor: item }} key={index} onClick={() => handleChange(item)}>
                      {value === item && <MdCheck />}
                    </ButtonBase>
                  )}
                  <Stack direction='row' component='label'>
                    <ButtonBase ref={ref} component='div' tabIndex={0} sx={{ ...style.themeColorBox, ...style.themeColorPickerBox } as any}>
                      <MdAdd />
                    </ButtonBase>
                    <Box component='input' type='color' tabIndex={0} sx={style.input} onBlur={e => handleChange(e.target.value)} />
                  </Stack>
                </Stack>
              </>
            }}
          />
        )
      }}
    />
  )
}
