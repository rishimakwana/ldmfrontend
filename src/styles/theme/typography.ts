import { Theme, ThemeOptions } from '@mui/material'
import { Plus_Jakarta_Sans } from 'next/font/google'



const plusJakartaSansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export const createTypography = () => {
  return {
    fontFamily: `${plusJakartaSansFont.style.fontFamily}, system-ui, sans-serif`,
    display1: {
      fontSize: '1.75rem',
      fontWeight: 800,
      lineHeight: 'var(--line-height)',
    },
    h1: {
      fontSize: '1.375rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    h2: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    h4: {
      fontSize: '.875rem',
      fontWeight: 600,
      lineHeight: 'var(--line-height)',
    },
    h5: {
      fontSize: '.7rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    h6: {
      fontSize: '.6rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    body1: {
      fontSize: '.875rem',
      lineHeight: 'var(--line-height)',
    },
    body2: {
      fontSize: '.75rem',
      fontWeight: 500,
      lineHeight: 'var(--line-height)',
    },
    subtitle: {
      fontSize: '.875rem',
      fontWeight: 500,
      lineHeight: 'var(--line-height)',
    }
  } as Theme['typography']
}

export const overridesTypography = (theme: Theme) => {
  return {
    display1: theme.unstable_sx({
      color: 'text.primary',
    }),
    h1: theme.unstable_sx({
      color: 'text.primary',
    }),
    h2: theme.unstable_sx({
      color: 'text.primary',
    }),
    h3: theme.unstable_sx({
      color: 'text.primary',
    }),
    h4: theme.unstable_sx({
      color: 'text.primary',
    }),
    h5: theme.unstable_sx({
      color: 'text.primary',
    }),
    h6: theme.unstable_sx({
      color: 'text.primary',
    }),
    body1: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body2: theme.unstable_sx({
      color: 'text.disabled',
    }),
    caption: theme.unstable_sx({
      color: 'text.disabled',
    }),
    subtitle1: undefined,
    subtitle2: undefined,
  } as ThemeOptions['typography']
}


/* Typescript
======================== */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    display1: React.CSSProperties
    subtitle: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    display1?: React.CSSProperties
    subtitle?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    subtitle: true
    subtitle1: false
    subtitle2: false
  }
}