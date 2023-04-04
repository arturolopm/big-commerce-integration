import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import axios from "axios";
import CartSearch from "./CartSearch";
import CartItems from "../cart/CartItems";
const NavBar = () => {
  const { setItems } = useContext(GeneralContext);

  const searchCart = async (cartId) => {
    if (cartId) {
      const response = await axios.get(`http://localhost:3001/carts/${cartId}`);
      setItems(response.data.line_items.physical_items);
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
