import { createContext, useState } from "react";
const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  // State variables

  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(items);

  const handleAddToCart = (productId, price, name) => {
    if (items.length === 0) {
      setItems([
        {
          quantity: 1,
          product_id: productId,
          list_price: price,
          name: name,
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
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

// Export the context and provider
export { GeneralContextProvider, GeneralContext };
