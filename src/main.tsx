import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { applyTheme, settings } from '@/core/settings'
import { Shell } from '@/app/Shell'

applyTheme(settings.get())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shell />
  </StrictMode>,
)
