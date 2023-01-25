import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductsUI from './ProductUI';
import useAxios from '../../hooks/useAxios';
const Products = () => {
  const api = useAxios();
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [err, setErr] = useState('');
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState({
    name: '',
    url: '',
    quantity: 0,
    price: '',
  });
  const getProducts = async () => {
    try {
      const res = await api.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/all`
      );
      setProducts([...res.data.products]);
    } catch (error) {}
  };
  const searchProducts = async (e) => {
    try {
      const results = await api.get('/api/products/all');
      const products = results.data.products.filter((result) => {
        if (query === '') return results.data;
        return result.name.toLowerCase().includes(query.toLowerCase());
      });
      setProducts([...products]);
    } catch (error) {}
  };
  const addProduct = async (e) => {
    e.preventDefault();
    if (
      productInfo.name.trim().length < 1 ||
      productInfo.url.trim().length < 1 ||
      productInfo.price.trim().length < 1
    ) {
      setErr('Please fill all the fields');
    } else {
      try {
        await api.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/add`,
          productInfo
        );
        getProducts();
        toast.success('Product added successfully!');
      } catch (error) {
        toast.error('Something went wrong');
      }

      setProductInfo({ name: '', url: '', quantity: 0, price: '' });
    }
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    if (
      productInfo.name.trim().length < 1 ||
      productInfo.url.trim().length < 1 ||
      productInfo.price.trim().length < 1
    ) {
      setErr('Please fill all the fields');
    } else {
      try {
        await api.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/update/${productInfo.id}`,
          productInfo
        );
        getProducts();
        toast.success('Product Updated successfully!');
      } catch (error) {
        toast.error('Something went wrong');
      }

      setProductInfo({ name: '', url: '', quantity: 0, price: '' });
    }
  };
  const deleteProduct = async (id) => {
    try {
      await api.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/delete/${id}`
      );
      getProducts();
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  return (
    <ProductsUI
      isModalOpen={isModalOpen}
      setIsModelOpen={setIsModelOpen}
      onClick={isEditing ? updateProduct : addProduct}
      productInfo={productInfo}
      setProductInfo={setProductInfo}
      err={err}
      setErr={setErr}
      products={products}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      deleteProduct={deleteProduct}
      query={query}
      setQuery={setQuery}
    />
  );
};

export default Products;
