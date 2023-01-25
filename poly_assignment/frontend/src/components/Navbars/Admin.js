import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
const Admin = ({ setActiveLink }) => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div className='w-10 bg-gray-800 h-screen text-white pt-14 pl-5'>
      <ul className='cursor-pointer'>
        <li
          className='hover:underline'
          onClick={() => setActiveLink('products')}
        >
          Products
        </li>
        <li
          className='my-5 hover:underline'
          onClick={() => setActiveLink('orders')}
        >
          Orders
        </li>
        <li
          className='hover:underline bottom-5 fixed'
          onClick={() => logoutUser()}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Admin;
