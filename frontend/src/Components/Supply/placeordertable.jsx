import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PlacedOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    // Retrieve received orders from localStorage on component mount
    const storedReceivedOrders = JSON.parse(localStorage.getItem("receivedOrders")) || [];
    setReceivedOrders(storedReceivedOrders);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit order with id: ${id}`);
    navigate(`/sup/editorder/${id}`);
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

  const handleReceived = async (order) => {
    try {
      const { PrName, quantity } = order;
      if (!receivedOrders.some((receivedOrder) => receivedOrder._id === order._id)) {
        const response = await axios.post('http://localhost:8070/supplier/inv/add', { PrName, quantity });
        if (response.status === 201) {
          const updatedReceivedOrders = [...receivedOrders, order];
          setReceivedOrders(updatedReceivedOrders);
          // Store updated received orders in localStorage
          localStorage.setItem("receivedOrders", JSON.stringify(updatedReceivedOrders));
          Swal.fire({
            title: 'Confirmed!',
            text: 'The product has been confirmed.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to confirm the product.',
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'The product has already been confirmed.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error confirming product:', error);
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.PrName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by Product Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 m-2 border border-gray-400 rounded-md"
      />
      <div className="grid grid-cols-6 bg-cyan-400">
        <div className="border-2 border-black p-3">Supplier Name</div>
        <div className="border-2 border-black p-3">Product Name</div>
        <div className="border-2 border-black p-3">Quantity</div>
        <div className="border-2 border-black p-3">Edit</div>
        <div className="border-2 border-black p-3">Delete</div>
        <div className="border-2 border-black p-3">Received</div>
      </div>
      <div
        className="w-full overflow-auto"
        style={{
          maxHeight: "450px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filteredOrders.map((order, index) => (
          <div
            className={`grid grid-cols-6 ${
              index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
            }`}
            key={order._id}
          >
            <div className="border-2 border-black p-2">
              {suppliers
                .filter((sup) => sup._id.includes(order.Supplier))
                .map((sup) => sup.Name)}
            </div>
            <div className="border-2 border-black p-2">{order.PrName}</div>
            <div className="border-2 border-black p-2">{order.quantity}</div>
            <div className="border-2 border-black p-2">
              <button
                className="bg-blue-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                onClick={() => handleEdit(order._id)}
              >
                Edit
              </button>
            </div>
            <div className="border-2 border-black p-2">
              <button
                className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                onClick={() => handleDelete(order._id)}
              >
                Delete
              </button>
            </div>
            <div className="border-2 border-black p-2">
              <button
                className={`${
                  receivedOrders.some((receivedOrder) => receivedOrder._id === order._id)
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500"
                } border-2 border-black rounded-full p-1 px-4 text-white font-bold`}
                onClick={() => handleReceived(order)}
                disabled={receivedOrders.some((receivedOrder) => receivedOrder._id === order._id)}
              >
                {receivedOrders.some((receivedOrder) => receivedOrder._id === order._id) ? "Confirmed" : "Received"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacedOrderTable;
          