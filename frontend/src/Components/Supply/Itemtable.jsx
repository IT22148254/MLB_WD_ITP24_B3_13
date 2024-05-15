import React, { useEffect, useState } from "react";
import axios from "axios";

const Itemtable = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await axios.get("http://localhost:8070/supplier/inv/");
        setInventory(data.result);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      }
    };

    fetchInventory();
  }, []);

  // Calculate total quantity for each product name
  const calculateTotalByProductName = () => {
    const totals = {};
    inventory.forEach((item) => {
      const { PrName, quantity } = item;
      if (totals[PrName]) {
        totals[PrName] += quantity;
      } else {
        totals[PrName] = quantity;
      }
    });
    return totals;
  };

  const totalsByProductName = calculateTotalByProductName();

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 bg-cyan-400 text-center">
        <div className="border-2 border-black p-3 ">Product Name</div>
        <div className="border-2 border-black p-3">Total Quantity</div>
      </div>
      <div
        className="w-full overflow-auto"
        style={{
          maxHeight: "450px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {Object.entries(totalsByProductName).map(([productName, totalQuantity], index) => (
          <div
            className={`grid grid-cols-2 ${
              index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
            }`}
            key={productName}
          >
            <div className="border-2 border-black p-2 ">{productName}</div>
            <div className="border-2 border-black p-2">{totalQuantity}</div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemtable;

