import React, { useContext } from 'react';

const OrdersUI = ({ orders }) => {
  return (
    <>
      <div className='w-90 h-screen px-5 pt-4'>
        {orders && orders.length > 0 && (
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' class='px-6 py-3'>
                    #
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Order ID
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Customer Email
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Order Status
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Payment Status
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Order Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, idx) => (
                  <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 font-semibold text-base'>
                    <td class='px-6 py-4'>{idx + 1}</td>
                    <td class='px-6 py-4'>{item.id}</td>
                    <td class='px-6 py-4'>{item.customer_email}</td>
                    <td class='px-6 py-4'>{item.order_status}</td>
                    <td class='px-6 py-4'>{item.payment_status}</td>
                    <td class='px-6 py-4'>{item.order_total / 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersUI;
