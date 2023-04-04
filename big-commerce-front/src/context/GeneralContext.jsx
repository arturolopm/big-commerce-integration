import { createContext, useEffect, useState } from "react";
const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  // State variables

  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    }
  }, [items]);

  const handleAddToCart = (productId, price, name, variant_id) => {
    if (items.length === 0) {
      console.log("variant", variant_id);
      setItems([
        {
          quantity: 1,
          product_id: productId,
          list_price: price,
          name: name,
          variant_id: variant_id,
        },
      ]);
    } else {
      const updatedItems = [...items];
      let itemUpdated = false;
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].product_id === productId) {
          updatedItems[i] = {
            ...updatedItems[i],
            quantity: updatedItems[i].quantity + 1,
          };
          itemUpdated = true;
          break;
        }
      }
      if (!itemUpdated) {
        updatedItems.push({
          quantity: 1,
          product_id: productId,
          list_price: price,
          name: name,
        });
      }
      setItems(updatedItems);
    }
  };
  return (
    // Provide the socket context to the child components
    <GeneralContext.Provider
      value={{
        items,
        handleAddToCart,
        products,
        setProducts,
        openCart,
        setOpenCart,
        alert,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

// Export the context and provider
export { GeneralContextProvider, GeneralContext };
