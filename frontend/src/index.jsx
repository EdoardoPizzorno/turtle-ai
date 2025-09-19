import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme class on root
const rootEl = document.documentElement;
if (!rootEl.classList.contains('theme-dark') && !rootEl.classList.contains('theme-light')) {
  rootEl.classList.add('theme-dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
