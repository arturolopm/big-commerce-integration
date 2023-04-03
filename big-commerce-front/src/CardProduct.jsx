import parse from "html-react-parser";
const CardProduct = ({
  name,
  description,
  condition,
  id,
  price,
  handleAddToCart,
}) => {
  return (
    <div
      className=" p-3 my-3 text-lg bg-white"
      key={id}>
      <h2 className=" text-xl">{parse(name)}</h2>
      <h2>{condition}</h2>
      <div className=" ">{parse(description)}</div>
      <div>Price: {price}</div>
      <button
        className=" border-2 bg-slate-700 p-2 text-white rounded"
        onClick={() => handleAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
};

export default CardProduct;
