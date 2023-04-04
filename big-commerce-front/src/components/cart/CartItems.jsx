import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GeneralContext } from "../../context/GeneralContext";
import { MdShoppingCart } from "react-icons/md";

const CartItems = () => {
  const { items, openCart, setOpenCart, alert } = useContext(GeneralContext);

  const [sendCart, setSendCart] = useState(false);
  console.log(sendCart);

  useEffect(() => {
    const apiCart = async () => {
      if (sendCart) {
        const response = await axios.post("http://localhost:3001/cart", {
          body: items,
        });
        console.log(response.data);
      }
      setSendCart(false);
      // setProducts(response.data);
      return () => {
        setSendCart(false);
      };
    };

    apiCart();
  }, [sendCart]);

  return (
    <div>
      <div className=" flex justify-end p-3 border-4 bg-slate-100 ">
        <button onClick={() => setOpenCart((openCart) => !openCart)}>
          {openCart ? "Close Cart" : "Open Cart"}
          <MdShoppingCart className=" text-3xl" />
        </button>
      </div>
      {alert && (
        <div className=" absolute right-5 bg-slate-300 w-36 text-center rounded-lg text-black">
          item Added
        </div>
      )}
      {openCart && (
        <div className=" absolute right-5 bg-slate-300 w-1/2">
          <div className=" p-6">
            {items.length > 0 &&
              items.map((product) => (
                <div className=" flex  flex-col gap-3 p-3 my-3 text-lg bg-white">
                  <h2 className="  text-2xl">{product.name}</h2>

                  <div className=" ">Unit Price: {product.list_price}</div>
                  <div className=" ">Quantity: {product.list_price}</div>

                  <div className=" ">
                    Total Price: {product.list_price * product.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className=" flex justify-center">
            <button
              onClick={() => setSendCart(true)}
              className=" p-2 rounded-lg bg-black text-white font-bold">
              Send Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
