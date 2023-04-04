import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import axios from "axios";
import CartSearch from "./CartSearch";
import CartItems from "../cart/CartItems";
import Swal from "sweetalert2";
const NavBar = () => {
  const { setItems } = useContext(GeneralContext);

  const searchCart = async (cartId) => {
    if (cartId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/carts/${cartId}`
        );

        setItems(response.data.line_items.physical_items);
      } catch (error) {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "We could not find your cart, try adding some items and creating a new one",
        });
      }
    }
  };

  return (
    <>
      <CartSearch onSubmit={searchCart} />
      <CartItems />
    </>
  );
};

export default NavBar;
