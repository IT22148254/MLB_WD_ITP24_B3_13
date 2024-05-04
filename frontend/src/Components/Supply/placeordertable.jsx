import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Placedordertable = () => {

    //let navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders");
        // console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch Orders:", error);
      }
    };

    fetchOrders();
  }, []);

  

  const handleEdit = (id) => {
    console.log(`Edit order with id: ${id}`);
    //navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8000/orders/${id}`);

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
      }
    });
  };


    return ( 
      
        <div className="w-full">
        <div className="grid grid-cols-6 bg-cyan-400">
        <div className="border-2 border-black p-3">Supplier Name</div>
        <div className="border-2 border-black p-3">Product Name</div>
        <div className="border-2 border-black p-3">Quantity</div>
        <div className="border-2 border-black p-3">Size</div>
        <div className="border-2 border-black p-3">Edit</div>
        <div className="border-2 border-black p-3">Delete</div>
      </div>
      <div
        className="w-full overflow-auto "
        style={{
          maxHeight: "450px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {orders &&
          orders.map((order, index) => (
            <div
              className={`grid grid-cols-8 ${
                index % 2 == 0 ? "bg-cyan-200 " : "bg-cyan-400 "
              }`}
              key={order.id}
            >
              <div className="border-2 border-black p-2">
                {order.supplier}

              </div>
              <div className="border-2 border-black p-2">{order.product}</div>
              <div className="border-2 border-black p-2">{order.qty}</div>
              <div className="border-2 border-black p-2">
                {order.size}
              </div>
              <div className="border-2 border-black p-2">
                <button
                  className="bg-blue-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                  onClick={() =>
                handleEdit(order.id)
                 }
                >
                  Edit
                </button>
              </div>
              <div className="border-2 border-black p-2">
                <button
                  className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                  onClick={() =>
                handleDelete(order.id)
                 }>
                  Delete
                </button>
              </div>
              
            </div>
          ))}
      </div>
    </div>
    
     );
}
 
export default Placedordertable;