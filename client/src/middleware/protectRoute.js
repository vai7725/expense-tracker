import { Navigate } from 'react-router-dom';
import { selectUser, selectUserStatus } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/LoadingPage';

export const ProtectRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  if (status === 'loading') {
    return <LoadingPage />;
  }
  if (!user) {
    return <Navigate to={'/signin'} replace={true} />;
  }
  return children;
};

export const BlockAuth = ({ children }) => {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);

  if (status === 'loading') {
    return <LoadingPage />;
  }
  if (user) {
    return <Navigate to={'/'} replace={true} />;
  }
  return children;
};
