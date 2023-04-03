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
    <div className=" flex  flex-col gap-3 p-3 my-3 text-lg bg-white">
      <h2 className=" mb-2 text-2xl">{parse(name)}</h2>
      <h2>{condition}</h2>
      <div className=" mb-2">{parse(description)}</div>
      <div className=" mb-2">Price: {price}</div>
      <button
        className=" border-2 bg-slate-700 p-2 w-fit text-white rounded hover:bg-slate-200 hover:text-black"
        onClick={() => handleAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
};

export default CardProduct;