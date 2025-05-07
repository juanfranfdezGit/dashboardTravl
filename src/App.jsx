import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/themeContext';

import './styles/index.css'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layout/DashboardLayout';
import Bookings from './pages/Bookings';
import Guest from './pages/Guest';
import Employees from './pages/Employees';
import Rooms from './pages/Rooms';
import GuestDetails from './pages/GuestDetails';

import ProtectedRoute from './routes/protectedRoute';
import { LoginProvider } from './context/loginContext';
import { LanguageProvider } from './context/languageContext';
import store from './redux/store';

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
      { path: 'guest', element: <ProtectedRoute><Guest /></ProtectedRoute> },
      { path: 'guest/:id', element: <ProtectedRoute><GuestDetails /></ProtectedRoute> },
      { path: 'employees', element: <ProtectedRoute><Employees /></ProtectedRoute> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LoginProvider>
        <LanguageProvider>
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
        </LanguageProvider>
      </LoginProvider>
    </ThemeProvider>
  </React.StrictMode>
);