import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

export default AppContext;

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const contextData = { cartItems, setCartItems };
  useEffect(() => {
    if (cartItems.length > 0) {
      toast.success('Item Added');
    }
  }, [cartItems]);
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
