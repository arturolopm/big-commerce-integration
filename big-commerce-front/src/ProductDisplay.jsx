import { useState, useEffect } from "react";
import axios from "axios";

import CardProduct from "./CardProduct";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    console.log(`Adding product ${productId} to cart...`);
  };

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 &&
        products.map((product) => (
          <CardProduct
            name={product.name}
            description={product.description}
            condition={product.condition}
            id={product.id}
            price={product.price}
            handleAddToCart={handleAddToCart}
          />
        ))}
    </div>
  );
};

export default ProductDisplay;
