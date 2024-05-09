import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Placedordertable = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/sup/editorder/${id}`)
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

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 bg-cyan-400">
        <div className="border-2 border-black p-3">Supplier Name</div>
        <div className="border-2 border-black p-3">Product Name</div>
        <div className="border-2 border-black p-3">Quantity</div>
        <div className="border-2 border-black p-3">Edit</div>
        <div className="border-2 border-black p-3">Delete</div>
      </div>
      <div className="w-full overflow-auto " style={{ maxHeight: "450px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {orders.map((order, index) => (
          <div className={`grid grid-cols-5 ${index % 2 == 0 ? "bg-cyan-200 " : "bg-cyan-400 "}`} key={order._id}>
            <div className="border-2 border-black p-2">
              {suppliers.find(supplier => supplier.id === order.supplierId)?.Name || 'Unknown Supplier'}
            </div>
            <div className="border-2 border-black p-2">{order.PrName}</div>
            <div className="border-2 border-black p-2">{order.quantity}</div>
            <div className="border-2 border-black p-2">
              <button className="bg-blue-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleEdit(order._id)}>Edit</button>
            </div>
            <div className="border-2 border-black p-2">
              <button className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleDelete(order._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Placedordertable;
