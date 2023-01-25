import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import AppContext from '../../contexts/AppContext';
import BtnMedium from '../Buttons/BtnMedium';
const Product = ({
  product,
  productInfo,
  setProductInfo,
  setIsModelOpen,
  setIsEditing,
  deleteProduct,
}) => {
  const { user } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(AppContext);
  if (user && user.user.user_type === 'admin') {
    return (
      <div className='flex flex-col border-2 border-gray-500'>
        <img src={product.url} alt='product-img' />
        <h2 className='text-center font-bold text-xl'>{product.name}</h2>
        <h2 className=' text-center font-semibold'>
          Quantity: {product.quantity}
        </h2>
        <h2 className='text-center font-semibold'>Price: {product.price}/-</h2>
        <div className='flex justify-between w-4/5 mx-auto my-2'>
          <span
            className='bg-blue-500 px-2 text-white font-bold cursor-pointer rounded-md'
            onClick={() => {
              setIsEditing(true);
              setProductInfo({
                ...productInfo,
                name: product.name,
                price: product.price.toString(),
                quantity: product.quantity,
                url: product.url,
                id: product._id,
              });
              setIsModelOpen(true);
            }}
          >
            Edit
          </span>
          <span
            className='bg-red-500 px-2 text-white font-bold cursor-pointer rounded-md'
            onClick={() => deleteProduct(product._id)}
          >
            Delete
          </span>
        </div>
      </div>
    );
  } else {
    const addToCart = (e) => {
      e.preventDefault();
      setCartItems([...cartItems, product]);
    };
    return (
      <div className='flex flex-col rounded-lg bg-[#3f392d] w-2/3 text-white p-2 py-10'>
        <img
          src={product.url}
          alt='product-img'
          style={{ height: 'auto', width: '180px' }}
          className='block mx-auto'
        />
        <h2 className='font-semibold text-xl'>{product.name}</h2>
        <h2 className='font-semibold'>Price: {product.price}/-</h2>
        {product.quantity < 1 ? (
          <div className='mx-auto mt-3'>
            <span>Out of stock</span>
          </div>
        ) : (
          <div className='mx-auto mt-3'>
            <BtnMedium text='Add To Cart' onClick={addToCart} />
          </div>
        )}
      </div>
    );
  }
};

export default Product;
