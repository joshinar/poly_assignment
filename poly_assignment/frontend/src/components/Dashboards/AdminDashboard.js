import React, { useState } from 'react';
import Admin from '../Navbars/Admin';
import Orders from '../Orders/Orders';
import Products from '../Products/Products';

const AdminDashboard = () => {
  const [activeLink, setActiveLink] = useState('products');
  return (
    <div className='flex'>
      <Admin setActiveLink={setActiveLink} />
      {activeLink === 'products' && <Products />}
      {activeLink === 'orders' && <Orders />}
    </div>
  );
};

export default AdminDashboard;
