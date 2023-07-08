import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import ExpensePage from './pages/ExpensePage';
import RecordsPage from './pages/RecordsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExpensePage />,
  },
  {
    path: '/records',
    element: <RecordsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
