import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).token)
      : null
  );

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        JSON.stringify({
          email,
          password,
          type: 'customer',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.data;
      setAuthTokens(data);
      setUser(jwt_decode(data.token));
      localStorage.setItem('authTokens', JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else toast.error('Something went wrong');
    }
  };
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.data;
      setAuthTokens(data);
      setUser(jwt_decode(data.token));
      localStorage.setItem('authTokens', JSON.stringify(data));
      setLoading(false);
      navigate(data.user_type === 'admin' ? '/admin-dashboard' : '/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else toast.error('Something went wrong');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/');
  };

  const contextData = {
    user,
    authTokens,
    setAuthTokens,
    setUser,
    registerUser,
    loginUser,
    logoutUser,
    loading,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.token));
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
