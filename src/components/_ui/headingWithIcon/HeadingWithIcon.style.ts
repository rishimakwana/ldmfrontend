import { alpha } from '@mui/material'
import { Style } from '@/types'



export const style: Style = {
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    '.icon': {
      color: theme => alpha(theme.palette.text.secondary, .6),
    }
  }
}