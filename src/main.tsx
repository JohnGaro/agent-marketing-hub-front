import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import App from './App.tsx'
import { estateTheme } from './theme/estateTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={estateTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
