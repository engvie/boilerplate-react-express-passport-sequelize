import { StrictMode, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'

import ProtectedRoute from './ProtectedRoute.jsx';
import ErrorPage from './error-page.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';

import { getUser } from './api/userApi.js';

import { useUserStore } from './store/userStore';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUserStore();


  useEffect(() => {

    // Fetch user on initialization 
    getUser()
      .then((response) => {
        setUser(response)
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);




  if (isLoading) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: '/dashboard',
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App
