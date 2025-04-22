import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './styles/index.css'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layout/DashboardLayout';
import Bookings from './components/dashboard/Bookings';
import Users from './components/dashboard/Users';
import Contact from './components/dashboard/Contact';
import Rooms from './components/dashboard/Rooms';

import ProtectedRoute from './routes/protectedRoute';
import { LoginProvider } from './context/loginContext';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'bookings', element: <ProtectedRoute><Bookings /></ProtectedRoute> },
      { path: 'rooms', element: <ProtectedRoute><Rooms /></ProtectedRoute> },
      { path: 'users', element: <ProtectedRoute><Users /></ProtectedRoute> },
      { path: 'contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>
);