import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrdersUI from './OrdersUI';
import useAxios from '../../hooks/useAxios';
const Orders = () => {
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await api.get(`/api/orders/all`);
      setOrders([...res.data.orders]);
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, []);

  return <OrdersUI orders={orders} />;
};

export default Orders;
