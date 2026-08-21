import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Hauction from './Hauction.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hauction />
  </StrictMode>,
)
