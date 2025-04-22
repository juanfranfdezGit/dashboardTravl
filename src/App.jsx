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

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '/dashboard', element: <DashboardLayout />,
    children: [
      {path: '', element: <Dashboard />},
      {path: 'bookings', element: <Bookings />},
      {path: 'rooms', element: <Rooms />},
      {path: 'users', element: <Users />},
      {path: 'contact', element: <Contact />},
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);