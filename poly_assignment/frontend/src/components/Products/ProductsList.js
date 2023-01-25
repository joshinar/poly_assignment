import React, { useContext } from 'react';
import Product from './Product';
import AuthContext from '../../contexts/AuthContext';

const ProductsList = ({
  products,
  setIsModelOpen,
  setProductInfo,
  setIsEditing,
  productInfo,
  deleteProduct,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={
        user&&user.user.user_type === 'admin'
          ? 'grid grid-cols-4 gap-5 w-5/6 mx-auto mt-5'
          : 'grid grid-cols-3 gap-5 w-4/5 mx-auto'
      }
    >
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <Product
            product={product}
            setIsModelOpen={setIsModelOpen}
            setProductInfo={setProductInfo}
            setIsEditing={setIsEditing}
            productInfo={productInfo}
            deleteProduct={deleteProduct}
          />
        ))}
    </div>
  );
};

export default ProductsList;
