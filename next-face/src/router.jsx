import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Users from './pages/Users.jsx';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './pages/Login.jsx';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

]);

export default appRouter;
