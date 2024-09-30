import { Style } from '@/types/Style.type'



export const style: Style = {
  root: {
    mt: 'calc(var(--header-bottom-margin) * -1)',
    bgcolor: 'background.bg2',
    borderBottom: 1,
    borderColor: 'divider',
  },
  tab: {
    py: 2.3,
    px: 0,
    minHeight: 'unset',
    minWidth: 'unset',
    '&:not(:last-of-type)': {
      mr: 5
    }
  }
}