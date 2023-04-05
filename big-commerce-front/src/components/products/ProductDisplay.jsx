import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import axios from "axios";

import CardProduct from "./CardProduct";

const ProductDisplay = () => {
  const { products, setProducts } = useContext(GeneralContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className=" p-6 bg-slate-100">
      <div className=" text-3xl font-bold mb-4">Products</div>
      <div className=" grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  ">
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
