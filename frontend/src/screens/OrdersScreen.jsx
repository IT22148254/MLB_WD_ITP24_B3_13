import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Table } from "react-bootstrap";
import Loader from "../content/Loader";

const OrdersScreen = () => {
  const { id: myId } = useParams();
  const { data: myOrders, isLoading, isError } = useGetMyOrdersQuery(myId);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log("Error occurred while fetching data:", isError); // Log the error
    return <div>Error occurred while fetching data</div>;
  }

  if (!myOrders) {
    return <div>No orders found</div>;
  }

  return (
    <div className="my-3 mx-3">
      <h2 className="text-xl font-semibold">Orders made by {auth.userInfo.Fname}</h2>
      <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Shipping Address</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Is Paid</th>
            <th className="px-4 py-2">Is Delivered</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order) => (
            <tr
              key={order._id}
              className="cursor-pointer transition-all hover:bg-gray-100"
              onClick={() => navigate(`/store/orderst/${order._id}`)}
            >
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">
                {order.orderItems.map((item) => (
                  <div key={item._id}>{item.name}</div>
                ))}
              </td>
              <td className="px-4 py-2">
                {order.orderItems.map((item) => (
                  <div key={item._id}>{item.quantity}</div>
                ))}
              </td>
              <td className="px-4 py-2">
                {order.orderItems.map((item) => (
                  <div key={item._id}>{`${Number(item.price)} LKR`} </div>
                ))}
              </td>
              <td className="px-4 py-2">{order.paymentMethod}</td>
              <td className="px-4 py-2">
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.district}
              </td>
              <td className="px-4 py-2">{Number(order.totalPrice).toFixed(2)} LKR</td>
              <td className="px-4 py-2">{order.isPaid ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{order.isDelivered ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersScreen;
