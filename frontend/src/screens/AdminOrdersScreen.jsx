import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useRemoveOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../content/Loader";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminOrdersScreen = () => {
  const navigate = useNavigate();

  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();

  const [removeOrder, { isLoading: isRemoving }] = useRemoveOrderMutation();
  const [SearchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // let users;
  // const getUsers = async () => {
  //   users = await axios.get("/user/").then((res) => res.data);
  // };
  
  // getUsers();

  // console.log(users);

  const deleteOrderHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the order ?")) {
      try {
        await removeOrder(id);
        toast.success("Order deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Order deletion unsuccessful");
        console.log("Error occurred while deleting the order:", error);
      }
    }
  };

  useEffect(() => {
    if (orders) {
      const results = orders.filter((order) =>
        order._id.toLowerCase().includes(SearchTerm.toLowerCase())
      );
      setFilteredOrders(results);
    }
  }, [orders, SearchTerm]);

  //console.log(filteredOrders);

  if (isLoading || isRemoving) {
    return <Loader />;
  }

  if (isError) {
    console.log("Error occurred while fetching data:", isError);
    return <div>Error occurred while fetching data</div>;
  }

  if (!orders) {
    return <div>No orders found</div>;
  }

  function convertToCSV(headers, data) {
    const headerRow = headers.join(",");
    const rows = data
      .map((item) => headers.map((header) => item[header]).join(","))
      .join("\n");
    return `${headerRow}\n${rows}`;
  }

  const reportHandler = () => {
    const headers = ["_id", "user", "totalPrice", "createdAt"];

    const csvContent = convertToCSV(headers, orders);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    //console.log("generated report");
  };

  const unpaidOrdersCount = orders.filter((order) => !order.isPaid).length;
  const unDeliveredOrdersCount = orders.filter(
    (order) => !order.isDelivered
  ).length;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Order Id search..."
              value={SearchTerm}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-x-4">
            <button className="bg-green-400 hover:bg-green-500 rounded-lg h-10 w-36 text-center">
              Generate Report
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 rounded-lg h-10 w-36 text-center"
              onClick={(e) => reportHandler()}
            >
              Generate Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date and Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment
                      <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full">
                        {unpaidOrdersCount}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delivery
                      <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full">
                        {unDeliveredOrdersCount}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    //console.log(order),
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{`${order.createdAt.slice(
                        0,
                        10
                      )} at ${order.createdAt.slice(11, 19)}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isPaid ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Not Paid
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isDelivered ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Not Delivered
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                          onClick={() =>
                            navigate(`/store/orderst/${order._id}`)
                          }
                        >
                          View
                        </button>
                        <button
                          className="ml-2 px-4 py-2 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue active:bg-yellow-600 transition duration-150 ease-in-out"
                          onClick={() =>
                            navigate(`/store/orderst/ed/${order._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                          onClick={(e) => deleteOrderHandler(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrdersScreen;
