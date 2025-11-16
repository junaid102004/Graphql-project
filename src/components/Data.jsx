import React, { useEffect, useState } from "react";

const Data = () => {
  const [updateData, setUpdatedData] = useState({});
  const products = [
    { id: 1, name: "Laptop", price: 45000 },
    { id: 2, name: "Mouse", price: 999 },
    { id: 3, name: "Keyboard", price: 1999 },
  ];
  useEffect(() => {
    const result = manipulateData(products);
    setUpdatedData(result); // store it in state
  }, []);
  //   const manipulateData = (data) => {
  //     setupdateData(
  //       data.map((d) => {
  //         ...d,
  //         d?.price.toString();
  //       })
  //     );
  //     console.log("updateData",updateData)
  //   };
  
  const manipulateData = (data) => {
    // Convert price to string for each product
    const updated = data.map((d) => ({
      ...d,
      price: d.price.toString(),
    }));
    return updated;
  };
  useEffect(() => {
    manipulateData(products);
  }, []);

  return <div>data</div>;
};

export default Data;
