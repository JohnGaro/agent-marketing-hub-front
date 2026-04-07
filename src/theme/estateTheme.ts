import type { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'
import { estateColors as c } from './colors'

const fontManrope = '"Manrope", "Inter", sans-serif'
const fontInter = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'

const manropeExtrabold125: CSSProperties = {
  fontFamily: fontManrope,
  fontWeight: 800,
  fontSize: '1.25rem',
  lineHeight: 1.2,
}

const interStatOverline: CSSProperties = {
  fontFamily: fontInter,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontSize: '0.75rem',
  lineHeight: 1.5,
}

declare module '@mui/material/styles' {
  interface Palette {
    estate: typeof c
  }
  interface PaletteOptions {
    estate?: Partial<typeof c>
  }
  interface TypographyVariants {
    brandMark: CSSProperties
    panelTitle: CSSProperties
    navLabel: CSSProperties
    sideCaption: CSSProperties
    microCaption: CSSProperties
    metricLabel: CSSProperties
    activityMeta: CSSProperties
    statLabelOnPrimary: CSSProperties
  }
  interface TypographyVariantsOptions {
    brandMark?: CSSProperties
    panelTitle?: CSSProperties
    navLabel?: CSSProperties
    sideCaption?: CSSProperties
    microCaption?: CSSProperties
    metricLabel?: CSSProperties
    activityMeta?: CSSProperties
    statLabelOnPrimary?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    brandMark: true
    panelTitle: true
    navLabel: true
    sideCaption: true
    microCaption: true
    metricLabel: true
    activityMeta: true
    statLabelOnPrimary: true
  }
}

export const estateTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: c.primary,
      dark: c.primaryContainer,
      light: c.primaryFixed,
      contrastText: c.onPrimary,
    },
    secondary: {
      main: c.secondary,
      light: c.secondaryContainer,
      contrastText: c.onSecondary,
    },
    error: {
      main: c.error,
      contrastText: c.onError,
    },
    success: {
      main: c.green600,
    },
    background: {
      default: c.background,
      paper: c.surfaceContainerLowest,
    },
    text: {
      primary: c.onSurface,
      secondary: c.onSurfaceVariant,
    },
    divider: c.outlineVariant,
    estate: c,
  },
  typography: {
    fontFamily: fontInter,
    h2: {
      fontFamily: fontManrope,
      fontWeight: 800,
    },
    h3: {
      fontFamily: fontManrope,
      fontWeight: 800,
      fontSize: '1.875rem',
      lineHeight: 1.2,
      '@media (max-width:599.95px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontFamily: fontManrope,
      fontWeight: 800,
      fontSize: '2rem',
      lineHeight: 1,
    },
    h5: {
      fontFamily: fontManrope,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      fontSize: '1.5rem',
      '@media (max-width:599.95px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontFamily: fontManrope,
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    brandMark: { ...manropeExtrabold125 },
    panelTitle: { ...manropeExtrabold125 },
    navLabel: {
      fontFamily: fontManrope,
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    sideCaption: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    microCaption: {
      fontSize: '0.625rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    metricLabel: {
      fontSize: '0.625rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    activityMeta: {
      fontSize: '0.625rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.02em',
    },
    statLabelOnPrimary: { ...interStatOverline },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    overline: { ...interStatOverline },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: {
      fontFamily: fontInter,
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: c.background,
          color: c.onSurface,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '0.35em',
        },
      },
      variants: [
        {
          props: { variant: 'activityMeta' },
          style: ({ theme }) => ({
            color: theme.palette.estate.outline,
          }),
        },
        {
          props: { variant: 'metricLabel' },
          style: ({ theme }) => ({
            color: theme.palette.text.secondary,
          }),
        },
        {
          props: { variant: 'statLabelOnPrimary' },
          style: ({ theme }) => ({
            color: theme.palette.primary.light,
          }),
        },
      ],
    },
  },
})
