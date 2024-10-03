import { Style } from '@/types'

export const style: Style = {
  box: {
    p: 4,
    maxWidth: 750,
    gap: 3,
    borderRadius: 2.5,
    bgcolor: 'background.default',
    mx: 'auto',
    border: 1,
    borderColor: 'divider',
  },
  resendOtp: {
    ':hover': { bgcolor: 'transparent' },
    textDecoration: 'underline',
    fontSize: 14,
    px: 0
  },
  handleButton: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  }
}