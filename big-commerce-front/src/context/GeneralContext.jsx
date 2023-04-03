import { createContext, useState } from "react";
const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  // State variables

  const [items, setItems] = useState({});
  const [products, setProducts] = useState([]);

  //   Functions
  const handleAddToCart = (productId) => {
    console.log(`Adding product ${productId} to cart...`);
  };

  return (
    // Provide the socket context to the child components
    <GeneralContext.Provider
      value={{
        items,
        setItems,
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
