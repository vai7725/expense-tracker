import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExpensePage from './pages/ExpensePage';
import RecordsPage from './pages/RecordsPage';
import SignIn from './features/auth/components/SignIn';
import { BlockAuth, ProtectRoute } from './middleware/protectRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserAsync } from './features/auth/authSlice';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectRoute>
        <ExpensePage />
      </ProtectRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectRoute>
        <ProfilePage />
      </ProtectRoute>
    ),
  },
  {
    path: '/records',
    element: (
      <ProtectRoute>
        <RecordsPage />
      </ProtectRoute>
    ),
  },
  {
    path: '/signin',
    element: (
      <BlockAuth>
        <SignIn />
      </BlockAuth>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
