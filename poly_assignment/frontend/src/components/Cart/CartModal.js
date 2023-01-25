import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
  },
};

Modal.setAppElement('#root');
const CartModal = ({
  isModalOpen,
  setIsModelOpen,
  email,
  setEmail,
  onClick,
}) => {
  return (
    <div>
      {' '}
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={() => {
          setIsModelOpen(false);
        }}
      >
        <h2 className='text-center font-semibold text-lg'>
          Customer Information
        </h2>
        <form className='mt-5'>
          <div className='flex flex-col mb-2'>
            <label>Email</label>
            <input
              className='border-2 border-gray-500 rounded-md p-2'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className='bg-blue-500 text-white px-5 py-2 mx-auto block my-3'
            type='submit'
            onClick={onClick}
          >
            Pay Now
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CartModal;
