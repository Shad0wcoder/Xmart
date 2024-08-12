import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import AppState from './context/AppState.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppState>
    <RouterProvider router={router} />
  </AppState>,
)
