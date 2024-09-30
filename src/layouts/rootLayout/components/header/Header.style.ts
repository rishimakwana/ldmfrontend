import { Style } from '@/types'
import { HEADER_HEIGHT } from '@/layouts/rootLayout/RootLayout.config'



export const style: Style = {
  root: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 'var(--header-bottom-margin)',
  },
  container: {
    display: 'flex',
    gap: 3,
    height: HEADER_HEIGHT,
  },
  logo: {
    mr: 'auto',
  },
  button: {
    py: 1,
    px: 2.5,
  },
  divider: {
    height: 20,
    alignSelf: 'center',
    borderColor: 'dividerDark',
  },
  menuContainer: {
    flexDirection: 'row',
  },
  menuItem: {
    '--padding': (theme: any) => theme.spacing(1.5),
    px: 'var(--padding)',
    fontWeight: 500,
    color: 'text.primary',
    transition: 'color 0.3s ease',
    '&:before': {
      content: `''`,
      position: 'absolute',
      height: 2,
      bgcolor: 'primary.main',
      bottom: -2,
      left: 'var(--padding)',
      right: 'var(--padding)',
      transition: '0.3s ease',
      opacity: 0,
    },
    '&:hover': {
      color: 'primary.main',
      '&:before': {
        opacity: 1,
      }
    }
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 1,
    '.MuiAvatar-root': {
      outline: '4px solid transparent',
      transition: 'outline-color 0.3s ease',
    },
    ':hover': {
      '.MuiAvatar-root': {
        outlineColor: 'action.hover'
      }
    }
  },
  profileName: {
    fontWeight: 500,
    color: 'text.primary',
    ml: 1,
    mr: .25,
    overflow: 'hidden',
    maxWidth: 225,
  },
  avatar: {
    height: 35,
    width: 35,
  }
}