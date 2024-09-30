import { Stack, Typography } from '@mui/material'

import { HeadingWithIconProps } from './HeadingWithIcon.type'
import { style } from './HeadingWithIcon.style'



export default function HeadingWithIcon(props: HeadingWithIconProps) {
  const { text, Icon, sx, ...restProps } = props


  return (
    <Stack {...restProps} variant='h3' component={Typography} sx={{ ...style.root, ...sx } as any}>
      <Icon className='icon-lg' /> {text}
    </Stack>
  )
}
