import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import bg from "../../Images/bg_main.jpg";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8070/supplier/order');
        setOrders(data.result);
        setFilteredOrders(data.result);
      } catch (error) {
        console.error('Failed to fetch Orders', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = filterOrders(orders, searchInput);
    setFilteredOrders(filtered);
  }, [searchInput, orders]);

  const filterOrders = (orders, searchText) => {
    return orders.filter((order) =>
      order.OrderName.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const handleEdit = (id) => {
    navigate(`/sup/EditOrderForm/${id}`);
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
          text: "Failed to delete the order.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }
});
};

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Order Details Report', 14, 22);

    const columns = [
      { header: 'Order Name', dataKey: 'OrderName' },
      { header: 'Order Date', dataKey: 'OrderDate' },
      { header: 'Supplier', dataKey: 'Supplier' },
    ];

    const rows = filteredOrders.map((order) => ({
      OrderName: order.OrderName,
      OrderDate: order.OrderDate,
      Supplier: order.Supplier,
    }));

    doc.autoTable(columns, rows);
    doc.save('Order Report.pdf');
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="flex flex-col justify-center items-center h-screen mt-10 mb-10">
        <div className="bg-black/45 h-auto w-4/5 rounded-[50px] py-12 px-14 gap -inset-y-8">
          <p className="text-4xl text-white font-bold mb-4">Orders Table</p>
          <div className="mb-4">
            <div className="h-9 bg-white/70 w-1/2 rounded-lg">
              <input
                placeholder="Search by Name"
                className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 bg-cyan-400 text-white">
            <div className="border-2 border-black p-3">Order Name</div>
            <div className="border-2 border-black p-3">Order Date</div>
            <div className="border-2 border-black p-3">Supplier</div>
            <div className="border-2 border-black p-3">Edit</div>
            <div className="border-2 border-black p-3">Delete</div>
          </div>
          <div
            className="w-full overflow-auto"
            style={{ maxHeight: '450px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredOrders &&
              filteredOrders.map((order, index) => (
                <div
                  className={`grid grid-cols-5 ${index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-400'}`}
                  key={order._id}
                >
                  <div className="border-2 border-black p-2 text-black">{order.OrderName}</div>
                  <div className="border-2 border-black p-2 text-black">{order.OrderDate}</div>
                  <div className="border-2 border-black p-2 text-black">{order.Supplier}</div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
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
                </div>
              ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleCreateReport}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
