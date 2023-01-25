import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BtnMedium from '../Buttons/BtnMedium';
import AuthContext from '../../contexts/AuthContext';

const AuthUI = ({ text, isAdmin, isLogin, isRegister }) => {
  const { loginUser, registerUser } = useContext(AuthContext);
  const [authInfo, setAuthInfo] = useState({ email: '', password: '' });
  const fillTestDetails = (e) => {
    e.preventDefault();
    setAuthInfo({ email: 'admin@admin.com', password: '123456' });
  };
  return (
    <div className='grid place-items-center h-screen'>
      <form className='border-2 border-gray-500 p-9 w-1/3'>
        {isAdmin && (
          <BtnMedium
            text='Click to fill test admin details'
            onClick={(e) => fillTestDetails(e)}
          />
        )}
        <div className='flex flex-col w-full'>
          <label>Email</label>
          <input
            type='email'
            className='border-2 border-gray-500'
            value={authInfo.email}
            onChange={(e) =>
              setAuthInfo({ ...authInfo, email: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col'>
          <label>Password</label>
          <input
            type='password'
            className='border-2 border-gray-500'
            value={authInfo.password}
            onChange={(e) =>
              setAuthInfo({ ...authInfo, password: e.target.value })
            }
          />
        </div>
        <div className='my-3'>
          <BtnMedium
            text={text}
            onClick={(e) => {
              e.preventDefault();
              isRegister
                ? registerUser(authInfo.email, authInfo.password)
                : loginUser(authInfo.email, authInfo.password);
            }}
          />
          {isLogin ? (
            <Link to='/register'>
              <p className='text-blue-500 font-semibold text-base'>Register</p>
            </Link>
          ) : isRegister ? (
            <Link to='/login'>
              <p className='text-blue-500 font-semibold text-base'>Login</p>
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default AuthUI;
