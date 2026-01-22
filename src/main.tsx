import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          'rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-xl dark:border-white/10 dark:bg-slate-950 dark:text-slate-100',
      }}
    />
  </StrictMode>,
)
