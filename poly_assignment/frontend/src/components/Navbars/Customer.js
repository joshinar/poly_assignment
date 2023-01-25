import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import AuthContext from '../../contexts/AuthContext';
const Customer = ({ setActieLink }) => {
  const { cartItems } = useContext(AppContext);
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className='flex  justify-between px-9  py-4 sticky top-0 left-0 text-lg cursor-pointer font-semibold '>
      <h2 onClick={() => setActieLink('home')}>
        <Link to='/'>Home</Link>
      </h2>
      <ul className='flex text-lg cursor-pointer font-semibold relative'>
        {user && user.user ? (
          <li className='mx-5' onClick={() => logoutUser()}>
            Logout
          </li>
        ) : (
          <Link to='/login'>
            <li className='mx-5'>Login</li>
          </Link>
        )}
        <li onClick={() => setActieLink('cart')}>Cart</li>
        <span className='absolute -right-3 -top-2'>{cartItems.length}</span>
      </ul>
    </div>
  );
};

export default Customer;
