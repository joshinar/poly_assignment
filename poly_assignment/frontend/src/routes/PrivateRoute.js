import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  let { user } = useContext(AuthContext);
  return user && user.user.user_type === 'admin' ? (
    children
  ) : (
    <Navigate to='/admin' />
  );
};

export default PrivateRoute;
