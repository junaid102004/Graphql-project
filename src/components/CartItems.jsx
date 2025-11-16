import React, { useContext } from "react";

import { AppContext } from "../context/AppContext";
const CartItems = (items) => {
  const { userData, cartData, settingsData } = useContext(AppContext);
  // Combine them all into one big object
  const allData = { ...userData, ...cartData, ...settingsData };
  return <div>Total Cart Items = {allData?.cart?.length}</div>;
};

export default CartItems;
