import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router,Route,Routes, BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/qr-info/'>
    <App />
  </BrowserRouter>,
)
