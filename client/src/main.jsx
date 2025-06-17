import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import './index.css'

import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GuestHouseManager from './pages/GuestHouseManager.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import CheckAvailability from './pages/CheckAvailability.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
// import Login from './pages/Login.jsx'
import PrivateRoute from './pages/PrivateRoute.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path="/" element={<App />}>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/admin/dashboard" element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      } />
      <Route path="/guesthouses" element={
        <PrivateRoute>
          <GuestHouseManager />
        </PrivateRoute>
      } />
      <Route path="/admin/check-availability" element={
        <PrivateRoute>
          <CheckAvailability />
        </PrivateRoute>
      } />

    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
