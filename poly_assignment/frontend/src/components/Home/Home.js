import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import Customer from '../Navbars/Customer';
import Products from '../Products/Products';
import Thankyou from '../Thankyou/Thankyou';
import Hero from './Hero';

const Home = () => {
  const [activeLink, setActieLink] = useState('home');
  return (
    <div className='bg-[#E8EBED]'>
      <Customer setActieLink={setActieLink} />
      {activeLink === 'home' ? (
        <>
          <Hero />
          <Products />
        </>
      ) : activeLink === 'thank-you' ? (
        <Thankyou />
      ) : (
        <Cart setActieLink={setActieLink} />
      )}
    </div>
  );
};

export default Home;
