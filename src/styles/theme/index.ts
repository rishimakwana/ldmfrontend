import { Theme, createTheme } from '@mui/material'

import { createTypography, overridesTypography } from './typography'
import { createPalette } from './palette'
import { overridesComponent } from './components'
import { overridesShadows } from './shadows'
import { usePage, useReduxSelector } from '@/hooks'



export const useMakeTheme = (): Theme => {
  const { isAdminDashboard } = usePage()

  let theme = createTheme({
    palette: createPalette(),
    typography: createTypography(),
    shape: {
      borderRadius: 8
    }
  })

  theme = createTheme(theme, {
    components: overridesComponent(theme),
    typography: overridesTypography(theme),
    shadows: overridesShadows(theme),
  } as Theme)

  return theme
}