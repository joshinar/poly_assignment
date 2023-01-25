import React from 'react';
import AuthUI from './AuthUI';

const AdminLogin = () => {
  return <AuthUI text='Login' isAdmin={true} />;
};

export default AdminLogin;
