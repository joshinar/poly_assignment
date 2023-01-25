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
const ProductModal = ({
  isModalOpen,
  setIsModelOpen,
  onClick,
  productInfo,
  setProductInfo,
  err,
  setErr,
  isEditing,
  setIsEditing,
}) => {
  return (
    <div>
      {' '}
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={() => {
          setIsModelOpen(false);
          setProductInfo({ name: '', url: '', quantity: 0, price: '' });
          setErr('');
          setIsEditing(false);
        }}
      >
        <h2 className='text-center font-semibold text-lg'>Product Details</h2>
        <p className='text-red-500'>{err}</p>
        <form className='mt-5'>
          <div className='flex flex-col mb-2'>
            <label>Name</label>
            <input
              className='border-2 border-gray-500 rounded-md p-2'
              placeholder='Enter product name'
              value={productInfo.name}
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            />
          </div>
          <div className='flex flex-col'>
            <label>Image Url</label>
            <input
              className='border-2 border-gray-500 rounded-md p-2'
              placeholder='Enter image url'
              value={productInfo.url}
              onChange={(e) =>
                setProductInfo({ ...productInfo, url: e.target.value })
              }
            />
          </div>
          <div className='flex flex-col'>
            <label>Quantity</label>
            <input
              className='border-2 border-gray-500 rounded-md p-2'
              type='number'
              placeholder='Enter quantity'
              value={productInfo.quantity}
              onChange={(e) =>
                setProductInfo({ ...productInfo, quantity: e.target.value })
              }
            />
          </div>
          <div className='flex flex-col'>
            <label>Price</label>
            <input
              className='border-2 border-gray-500 rounded-md p-2'
              placeholder='Enter price'
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
            />
          </div>
          <button
            className='bg-blue-500 text-white px-5 py-2 mx-auto block my-3'
            type='submit'
            onClick={onClick}
          >
            {isEditing ? 'Update Product' : ' Add Product'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductModal;
