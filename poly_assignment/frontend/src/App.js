import React from 'react';
import AppRoutes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
