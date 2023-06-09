import { useContext } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import parse from "html-react-parser";

const CardProduct = ({
  name,
  description,
  condition,
  id,
  price,
  variant_id,
}) => {
  const { handleAddToCart } = useContext(GeneralContext);

  return (
    <div className=" flex  h-fit min-h-full flex-col gap-3 p-3 my-3 text-lg bg-white">
      <h2 className=" mb-2 text-2xl">{parse(name)}</h2>
      {condition && <h2>Condition: {condition}</h2>}
      {description && (
        <div className=" text-ellipsis text-sm h-fit mb-2">
          {parse(description)}
        </div>
      )}
      <div className="  mb-2">Price: {price}</div>
      {id && (
        <div className=" grow flex justify-end">
          <button
            className=" self-end  border-2 bg-slate-700 p-2 w-fit text-white rounded hover:bg-slate-200 hover:text-black"
            onClick={() => handleAddToCart(id, price, name, variant_id)}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CardProduct;
