import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Table } from "react-bootstrap";
import Loader from "../content/Loader";

const OrdersScreen = () => {
  const { id: myId } = useParams();
  const { data: myOrders, isLoading, isError } = useGetMyOrdersQuery(myId);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(myOrders);
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
      <h2>Orders made by {auth.userInfo.Fname}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Shipping Address</th>
            <th>Total Price</th>
            <th>Is Paid</th>
            <th>Is Delivered</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order) => (
            <tr onClick={(e) => navigate(`/store/orderst/${order._id}`) } >
              <td>{order._id}</td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item._id}>{item.name}</div>
                ))}
              </td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item._id}>{item.quantity}</div>
                ))}
              </td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item._id}>${item.price}</div>
                ))}
              </td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.district}
              </td>
              <td>${order.totalPrice}</td>
              <td>{order.isPaid ? "Yes" : "No"}</td>
              <td>{order.isDelivered ? "Yes" : "No"}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersScreen;
