import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import App from './App.tsx'
import logo from './assets/logo.png'
import { Analytics } from '@vercel/analytics/react'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <Analytics />
    </ToastProvider>
  </StrictMode>,
)
document.title = "MoodiNeko";
const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
if (link) {
  link.href = logo;
}

