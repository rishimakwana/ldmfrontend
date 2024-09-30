import { alpha } from '@mui/material'
import { Style } from '@/types'
import { NavItemProps } from './NavItem.type'



export const makeStyle = (size: NavItemProps['size'], isChildren: boolean | undefined): Style => {
  return ({
    root: {
      ...(size === 'large' && {
        borderRadius: 1,
        p: 1.1,
        pl: isChildren ? 4 : 1,
      }),
      '&.active': {
        bgcolor: (theme: any) => alpha(theme.palette.primary.main, .07),
        '& *': {
          color: 'primary.main',
        }
      },
    },
    itemIcon: {
      minWidth: 'unset',
      pr: 1.75,
    },
    itemText: {
      ...(size === 'large' && {
        my: (theme: any) => `${theme.spacing(.5)} !important`,
      }),
      '& > *': {
        ...(size === 'large' && {
          fontWeight: '500 !important',
        }),
      }
    }
  })
}