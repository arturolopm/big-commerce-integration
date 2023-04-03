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
    <div className=" p-6 bg-slate-100">
      <h1 className=" text-3xl font-bold mb-4">Products</h1>
      <div className="  ">
        {products.length > 0 &&
          products.map((product) => (
            <CardProduct
              key={product.id}
              name={product.name}
              description={product.description}
              condition={product.condition}
              id={product.id}
              price={product.price}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
