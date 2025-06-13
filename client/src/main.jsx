import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import './index.css'

import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GuestHouseManager from './pages/GuestHouseManager.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />

      <Route path='/guesthouses' element={<GuestHouseManager />} />
    
      </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
