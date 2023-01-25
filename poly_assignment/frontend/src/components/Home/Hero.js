import React from 'react';

const Hero = () => {
  return (
    <div className='flex ' style={{ minHeight: '50vh' }}>
      <div className='w-2/3 p-20 pt-32'>
        <h2 className='font-extrabold tracking-wide text-transparent text-7xl bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
          Powered
        </h2>
        <h2 className=' text-6xl my-3'>By Intellect</h2>
        <h2 className=' text-6xl '>Driven By Values</h2>
      </div>
      <div className='w-1/3'>
        <img
          src='https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png'
          alt='phone'
          style={{ width: '100%', display:'block', height:'auto' }}
        />
      </div>
    </div>
  );
};

export default Hero;
