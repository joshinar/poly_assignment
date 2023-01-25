import React, { useContext } from 'react';
import BtnMedium from '../Buttons/BtnMedium';
import ProductModal from './ProductModal';
import ProductsList from './ProductsList';
import AuthContext from '../../contexts/AuthContext';

const ProductUI = ({
  isModalOpen,
  setIsModelOpen,
  onClick,
  productInfo,
  setProductInfo,
  err,
  setErr,
  products,
  isEditing,
  setIsEditing,
  deleteProduct,
  setQuery,
  query,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && user.user.user_type === 'admin' ? (
        <div className='w-90 h-screen px-5 pt-4'>
          <div className='flex justify-end'>
            <BtnMedium
              text='Add Product'
              onClick={() => setIsModelOpen(true)}
            />
          </div>
          <ProductsList
            products={products}
            setIsModelOpen={setIsModelOpen}
            setProductInfo={setProductInfo}
            setIsEditing={setIsEditing}
            productInfo={productInfo}
            deleteProduct={deleteProduct}
          />
          <ProductModal
            isModalOpen={isModalOpen}
            setIsModelOpen={setIsModelOpen}
            onClick={onClick}
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            err={err}
            setErr={setErr}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <div className='pt-5'>
          <h2 className='font-extrabold tracking-wide text-transparent text-3xl text-center mb-5 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
            Latest Arrivals
          </h2>
          <input
            className='border-2 border-gray-500 rounded-md block mx-auto mb-3 w-1/5 p-1'
            placeholder='Search or filter products..'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <ProductsList products={products} />
        </div>
      )}
    </>
  );
};

export default ProductUI;
