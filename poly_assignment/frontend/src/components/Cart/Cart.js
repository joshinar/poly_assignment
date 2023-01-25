import React, { useContext, useState, useEffect } from 'react';
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import AppContext from '../../contexts/AppContext';
import BtnMedium from '../Buttons/BtnMedium';
import CartModal from './CartModal';
const Cart = (setActieLink) => {
  const api = useAxios();
  const Razorpay = useRazorpay();
  const navigate = useNavigate();
  const { cartItems } = useContext(AppContext);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalopen] = useState(false);

  const makePayment = async (e) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      let product_ids = cartItems.map((item) => item._id);
      try {
        const res = await api.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/orders/create`,
          { product_ids, email }
        );
        await res.data;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'Equal Corp',
          description: 'Test Transaction',
          image: 'https://example.com/your_logo',
          order_id: res.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: async (response) => {
            await api.put(`/api/orders/update/${res.data.id}`, {
              payment_status: 'Fully paid',
            });
            navigate('/thank-you');
          },
          prefill: {
            name: 'John Doe',
            email: email,
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      let current = 0;
      cartItems.forEach((item) => (current += item.price));
      setTotal(current);
    }
  }, [cartItems]);
  return (
    <div
      className='bg-white  grid place-items-center'
      style={{ height: '70vh' }}
    >
      {cartItems.length > 0 && (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' class='px-6 py-3'>
                  #
                </th>
                <th scope='col' class='px-6 py-3'>
                  Product Name
                </th>
                <th scope='col' class='px-6 py-3'>
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 font-semibold text-base'>
                  <td class='px-6 py-4'>{idx + 1}</td>
                  <td class='px-6 py-4'>{item.name}</td>
                  <td class='px-6 py-4'>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className='text-center font-bold my-4'>Total: {total}</h2>
          <div className='flex justify-center'>
            <BtnMedium text='Checkout' onClick={() => setIsModalopen(true)} />
          </div>
        </div>
      )}
      <CartModal
        email={email}
        setEmail={setEmail}
        isModalOpen={isModalOpen}
        setIsModelOpen={setIsModalopen}
        onClick={(e) => makePayment(e)}
      />
    </div>
  );
};

export default Cart;
