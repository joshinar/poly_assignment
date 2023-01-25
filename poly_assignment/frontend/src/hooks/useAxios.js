import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'

const baseURL = process.env.REACT_APP_BACKEND_URL;

const useAxios = () => {
  const { authTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'x-auth-token': authTokens?.token,
    },
  });

  return axiosInstance;
};

export default useAxios;
