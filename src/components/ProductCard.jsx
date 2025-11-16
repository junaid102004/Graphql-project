import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import CartItems from "./CartItems";

const ProductCard = ({ product }) => {
  const { userData, cartData, settingsData } = useContext(AppContext);
  const user = 
  {
    name:"junaid",
    email:"jk@dhdh.cd"
  }
  ;
  // Combine them all into one big object
  const allData = { ...userData, ...cartData, ...settingsData };
  console.log("data is the key",allData)
  const loginUser=()=>{userData?.login(user)}; 
  const handleAdd = () => {
    allData.addToCart(product);
  };
useEffect(()=>{
  loginUser();
},[])
  return (
    <div className="border p-3 rounded">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button onClick={handleAdd}>Add to Cart</button>
      <p>Items in cart: {allData?.cart.length}</p>
      <p>By {allData?.user?.name}</p>
      <CartItems/>
    </div>
  );
};

export default ProductCard;
