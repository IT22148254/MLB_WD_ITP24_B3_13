import React, { useEffect, useState } from "react";
import axios from "axios";

const Itemtable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("http://localhost:8070/supplier/order/");
      setOrders(data);
    };
    fetchOrders();
  }, []);

  // Function to calculate total quantity for each product name
  const calculateTotalQuantity = (productName) => {
    let totalQuantity = 0;
    orders.forEach((order) => {
      if (order.PrName === productName) {
        totalQuantity += order.quantity;
      }
    });
    return totalQuantity;
  };

  // Group orders by product name and sum up quantities
  const groupedOrders = orders.reduce((acc, order) => {
    const { PrName, quantity, soldThisMonth, needToPurchase } = order;
    if (!acc[PrName]) {
      acc[PrName] = { PrName, total: 0, soldThisMonth: null, needToPurchase: null };
    }
    acc[PrName].total += quantity;
    // Assuming soldThisMonth and needToPurchase values are available in the order data
    acc[PrName].soldThisMonth += soldThisMonth || 0;
    acc[PrName].needToPurchase += needToPurchase || 0;
    return acc;
  }, {});

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 bg-cyan-400">
        <div className="border-2 border-black p-3">Product Name</div>
        <div className="border-2 border-black p-3">Total Quantity</div>
        <div className="border-2 border-black p-3">Sold this month</div>
        <div className="border-2 border-black p-3">Need to Purchase</div>
      </div>
      <div
        className="w-full overflow-auto"
        style={{ maxHeight: "450px", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {Object.values(groupedOrders).map((order, index) => (
          <div
            className={`grid grid-cols-4 ${
              index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
            }`}
            key={order.PrName}
          >
            <div className="border-2 border-black p-2">{order.PrName}</div>
            <div className="border-2 border-black p-2">{order.total}</div>
            <div className="border-2 border-black p-2">{order.soldThisMonth || '-'}</div>
            <div className="border-2 border-black p-2">{order.needToPurchase || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemtable;