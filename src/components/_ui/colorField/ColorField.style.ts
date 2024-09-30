import { Style } from '@/types'



export const style: Style = {
  root: {
    '.MuiInputBase-root': {
      pointerEvents: 'none',
    },
  },
  themeColorBoxContainer: {
    flexDirection: 'row',
    gap: .6,
    pointerEvents: 'auto',
  },
  themeColorBox: {
    height: 30,
    width: 30,
    borderRadius: .75,
    color: 'white',
    ':focus-visible': {
      outline: 1,
      outlineColor: 'primary.main',
      outlineOffset: 1,
    }
  },
  themeColorPickerBox: {
    bgcolor: 'divider',
    color: 'text.primary',
  },
  input: {
    height: 0,
    width: 0,
    opacity: 0,
  }
}