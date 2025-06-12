import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento 'root' não encontrado no DOM. Verifique seu index.html.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

