import { useState, useEffect } from "react";
import axios from "axios";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3001/products/");
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
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProductDisplay;
