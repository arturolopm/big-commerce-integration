import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import axios from "axios";

import CardProduct from "./CardProduct";

const ProductDisplay = () => {
  const { products, setProducts } = useContext(GeneralContext);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

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
              price={product.price}
              id={product.id}
              variant_id={
                product.base_variant_id != null
                  ? product.base_variant_id
                  : product.option_set_id
              }
            />
          ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
