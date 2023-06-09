import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { GeneralContext } from "../../context/GeneralContext";
import { MdShoppingCart, MdDelete } from "react-icons/md";

const CartItems = () => {
  const { items, openCart, setOpenCart, setItems } = useContext(GeneralContext);
  const [cartStyles, setCartStyles] = useState(
    "flex justify-end p-3 border-4 bg-slate-100"
  );
  const [response, setResponse] = useState();

  const apiCart = async () => {
    const responseApi = await axios.post("http://localhost:3001/carts", {
      body: {
        line_items: items,
      },
    });
    setResponse(responseApi.data.data);
  };
  useEffect(() => {
    if (response) {
      Swal.fire("Good job!", `Your cart id is ${response.id}`, "success");
    }
  }, [response]);

  return (
    <div className=" relative ">
      <div className="flex  right-5 top-5 fixed rounded-lg w-fit justify-end p-3  bg-slate-900 z-10 text-white hover:bg-slate-100 hover:text-black">
        <button onClick={() => setOpenCart((openCart) => !openCart)}>
          {/* {openCart ? "Close Cart" : "Open Cart"} */}
          <MdShoppingCart className=" text-3xl" />
        </button>
      </div>

      {openCart && (
        <div className=" border-4 border-black max-h-[90vh] overflow-y-scroll fixed right-5 top-9 bg-slate-300 w-1/2">
          <button onClick={() => setItems([])}>
            <div className="m-2 mx-5 font-bold "> Delete cart</div>
            <MdDelete className=" m-2 mx-5 text-xl" />
          </button>
          <div className="  p-6">
            {items.length > 0 &&
              items.map((product, key) => (
                <div
                  key={key}
                  className=" flex text-black flex-col gap-3 p-3 my-3 text-lg bg-white">
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
              onClick={() => apiCart()}
              className=" p-2 rounded-lg mb-4 bg-black text-white font-bold">
              Send Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
