import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@/layouts/rootLayout/RootLayout.config'
import { Style } from '@/types'



export const style: Style = {
  root: {
    width: `${SIDEBAR_WIDTH}px`,
    borderRight: 1,
    borderColor: 'divider',
    bgcolor: 'background.bg1',
    height: '100vh',
    overflow: 'hidden',
    gap: 2,
    pb: 2,
    position: 'sticky',
    top: 0,
    flexShrink: 0,
  },
  logoContainer: {
    px: 2,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    borderBottom: 1,
    borderColor: 'divider',
    flexDirection: 'row',
  },
  menuList: {
    flex: 1,
    overflow: 'hidden',
    px: 1,
  },
  profileBox: {
    px: 2,
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
  },
  circleSize: {
    width: 36,
    height: 36,
  }
} 