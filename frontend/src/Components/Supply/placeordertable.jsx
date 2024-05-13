
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Placedordertable = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("http://localhost:8070/supplier/order/");
      setOrders(data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8070/supplier");
        setSuppliers(data.result);
      } catch (error) {
        console.error("Failed to fetch Suppliers", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit order with id: ${id}`);
    // Handle edit logic
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8070/supplier/order/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(() => {
          // Refresh the page
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the Order.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleReceived = (id) => {
    // Find the order with the given id
    const order = orders.find((o) => o._id === id);

    // Add the order to the receivedOrders state
    setReceivedOrders((prevReceivedOrders) => [...prevReceivedOrders, order]);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 bg-cyan-400">
        <div className="border-2 border-black p-3">Supplier Name</div>
        <div className="border-2 border-black p-3">Product Name</div>
        <div className="border-2 border-black p-3">Quantity</div>
        <div className="border-2 border-black p-3">Edit</div>
        <div className="border-2 border-black p-3">Delete</div>
        <div className="border-2 border-black p-3">Received</div>
      </div>
      <div className="w-full overflow-auto" style={{ maxHeight: "450px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {orders.map((order, index) => (
          <div className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "}`} key={order._id}>
            <div className="border-2 border-black p-2">
              {suppliers.filter((sup) => sup._id.includes(order.Supplier)).map((sup) => sup.Name)}
            </div>
            <div className="border-2 border-black p-2">{order.PrName}</div>
            <div className="border-2 border-black p-2">{order.quantity}</div>
            <div className="border-2 border-black p-2">
              <button className="bg-blue-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleEdit(order._id)}>
                Edit
              </button>
            </div>
            <div className="border-2 border-black p-2">
              <button className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleDelete(order._id)}>
                Delete
              </button>
            </div>
            <div className="border-2 border-black p-2">
              <button className="bg-green-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleReceived(order._id)}>
                Received
              </button>
            </div>
          </div>
        ))}
      </div>
      <Itemtable receivedOrders={receivedOrders} />
    </div>
  );
};

const Itemtable = ({ receivedOrders }) => {
  // Group received orders by product name and sum up quantities
  const groupedOrders = receivedOrders.reduce((acc, order) => {
    const { PrName, quantity, soldThisMonth, needToPurchase } = order;
    if (!acc[PrName]) {
      acc[PrName] = { PrName, total: 0, soldThisMonth: null, needToPurchase: null };
    }
    acc[PrName].total += quantity;
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
      <div className="w-full overflow-auto" style={{ maxHeight: "450px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {Object.values(groupedOrders).map((order, index) => (
          <div className={`grid grid-cols-4 ${index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "}`} key={order.PrName}>
            <div className="border-2 border-black p-2">{order.PrName}</div>
            <div className="border-2 border-black p-2">{order.total}</div>
            <div className="border-2 border-black p-2">{order.soldThisMonth || "-"}</div>
            <div className="border-2 border-black p-2">{order.needToPurchase || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Placedordertable;