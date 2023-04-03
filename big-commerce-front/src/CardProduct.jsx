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
    <div key={id}>
      <h2>{parse(name)}</h2>
      <h2>{condition}</h2>
      <p>{parse(description)}</p>
      <div>{price}</div>
      <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

export default CardProduct;
