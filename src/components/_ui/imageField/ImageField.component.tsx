import { ChangeEvent, useRef, useState } from 'react'
import { Box, Dialog, FormHelperText, IconButton, Stack, Typography, FormLabel, FormControl, SxProps } from '@mui/material'
import { MdOutlineFileUpload } from 'react-icons/md'
import { RxEnterFullScreen, RxCross2 } from 'react-icons/rx'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'

import { ImageFieldProps } from './ImageField.type'
import { style } from './ImageField.style'



export default function ImageField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: ImageFieldProps<TFieldValues, TName>) {
  const { name, control, label, placeholder, helperText, description } = props
  const inputRef = useRef<HTMLInputElement>()

  const [viewImage, setViewImage] = useState<string | null>(null)
  const handleImagePopup = (value: string | null) => setViewImage(value)

  const handleClick = () => inputRef.current?.click()


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ fieldState: { error }, field: { ref, onChange, value } }) => {
        const imageLink = value ? typeof value === 'string' ? value : URL.createObjectURL(value) : ''

        const handleChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
          if (!files?.length) return
          onChange(files[0])
        }

        const handleRemove = () => {
          if (inputRef.current) inputRef.current.value = ''
          onChange('')
        }

        return <>
          <FormControl error={!!error} sx={{ mb: error ? 0 : .5 }}>
            {label && <FormLabel sx={style.label}>{label}</FormLabel>}

            <Stack sx={style.box} className={`${error?.message ? 'error' : ''}`}>

              {/* Upload Image */}
              {!value &&
                <Stack sx={style.uploadBox} tabIndex={0} onClick={handleClick} onKeyDown={event => event.key === 'Enter' && handleClick()}>
                  <MdOutlineFileUpload className='icon-lg' />
                  <Stack gap={.75}>
                    <Typography variant='subtitle' mt={0} color={error?.message ? 'error.main' : undefined}>{placeholder ? `Upload ${placeholder}` : 'Upload image'}</Typography>
                    {description && <Typography variant='body2'>{description}</Typography>}
                  </Stack>
                </Stack>
              }

              {/* View Image */}
              <Stack className='wrapper' gridTemplateRows={value ? '1fr' : '.4fr'}>
                {value &&
                  <Stack sx={style.imageBox}>
                    <Stack sx={style.tools}>
                      <IconButton sx={style.toolAction} onClick={() => handleImagePopup(imageLink)}><RxEnterFullScreen /></IconButton>
                      <IconButton sx={style.toolAction} onClick={handleRemove}><RxCross2 /></IconButton>
                    </Stack>
                    <Box component='img' sx={style.thumbnail} src={imageLink} />
                  </Stack>
                }
              </Stack>

              {/* File Input */}
              <Box
                component='input'
                type='file'
                accept='image/*'
                onChange={handleChange}
                sx={style.input}
                ref={(el: HTMLInputElement) => { ref(el); inputRef.current = el }}
                tabIndex={-1}
              />

              {/* View Image Popup */}
              <Dialog open={!!viewImage} maxWidth={false} sx={style.viewImageDialog} onClose={() => handleImagePopup(null)} scroll='body'>
                <IconButton onClick={() => handleImagePopup(null)} sx={{ ...style.toolAction, ...style.dialogCloseButton } as SxProps}><RxCross2 /></IconButton>
                <Box component='img' sx={style.dialogImage} src={imageLink} />
              </Dialog>

            </Stack>

            <FormHelperText>{error ? error?.message : helperText}</FormHelperText>
          </FormControl>
        </>
      }}
    />
  )
}
