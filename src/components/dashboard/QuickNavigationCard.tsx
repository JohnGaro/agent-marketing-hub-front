import { Link as RouterLink } from 'react-router-dom'
import { Link, Stack, Typography } from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'

const items = [
  { href: '/listing/create', label: 'Nouveau listing', icon: <AddBoxRoundedIcon color="primary" sx={{ fontSize: 28 }} /> },
  { href: '#', label: 'My Assets', icon: <AutoAwesomeRoundedIcon color="secondary" sx={{ fontSize: 28 }} /> },
  { href: '#', label: 'Settings', icon: <SettingsRoundedIcon color="secondary" sx={{ fontSize: 28 }} /> },
] as const

export function QuickNavigationCard() {
  return (
    <Stack
      spacing={2}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.4)',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: (t) => `0 25px 50px -12px ${t.palette.primary.main}0d`,
      }}
    >
      <Typography variant="panelTitle">Quick Navigation</Typography>
      <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
        {items.map((item) => (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.href}
            underline="none"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              color: (t) => t.palette.estate.onSurface,
              transition: 'box-shadow 0.2s',
              '&:hover': {
                boxShadow: 2,
                '& .nav-quick-icon': { transform: 'scale(1.1)' },
              },
            }}
          >
            <Stack className="nav-quick-icon" sx={{ transition: 'transform 0.2s' }}>
              {item.icon}
            </Stack>
            <Typography variant="caption" fontWeight={700}>
              {item.label}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Stack>
  )
}
