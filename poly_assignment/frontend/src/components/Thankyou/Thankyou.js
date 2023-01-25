import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
const Thankyou = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(AppContext);
  useEffect(() => {
    setCartItems([]);
    const timeout = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className='grid h-screen place-items-center'>
      <p className='text-2xl font-semibold'>
        Thank you for ordering!
        <br />
        <span className='text-sm font-normal text-center'>
          Redirecting to home...
        </span>
      </p>
    </div>
  );
};

export default Thankyou;
