import { useState } from "react";

const CartSearch = ({ onSubmit }) => {
  const [cartId, setCartId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(cartId);
  };

  const handleChange = (event) => {
    setCartId(event.target.value);
  };

  return (
    <div className=" ml-5 bg-slate-100 flex justify-start items-center h-fit">
      <form
        onSubmit={handleSubmit}
        className="bg-white  flex rounded shadow-lg">
        <div className=" flex p-2 ">
          <label
            htmlFor="cartId"
            className="block  text-gray-700 font-bold mb-2">
            Cart ID:
          </label>
          <input
            type="text"
            id="cartId"
            value={cartId}
            onChange={handleChange}
            className="appearance-none border rounded w-full  px-3 text-gray-700 leading-tight  focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-100 text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CartSearch;
