import { Style } from '@/types'



export const style: Style = {
  root: {
    justifyContent: 'center',
    mb: 3,
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
  },
  actionContainer: {
    ml: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
  }
}