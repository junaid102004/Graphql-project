import React from "react";
import ProductCard from "./ProductCard";

const Home = () => {
  // You must pass a product object here 👇
  const product = {
    id: 1,
    name: "Laptop",
    price: 45000,
  };

  return (
    <div>
      <h2>Home Page</h2>
      <ProductCard product={product} /> {/* ✅ Pass product prop */}
    </div>
  );
};

export default Home;
