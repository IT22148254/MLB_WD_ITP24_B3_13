import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Form,
  Card,
  Alert,
} from "react-bootstrap";
import Message from "../content/Message";
import Loader from "../content/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

import React from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong> {order.user.Fname}
              </p>
              <p>
                <strong>Email : </strong> {order.user.Email}
              </p>
              <p>
                <strong>Address : </strong> {order.shippingAddress.address}
              </p>
              {order.isDelivered ? (
                <Alert style={{ borderColor: "blue" }}>
                  Order is deliverd : {order.deliveredAt}
                </Alert>
              ) : (
                <Alert style={{ borderColor: "red" }}>
                  Order is not delivered
                </Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Method : </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert style={{ borderColor: "blue" }}>
                  Paid : {order.paidAt}
                </Alert>
              ) : (
                <Alert style={{ borderColor: "red" }}>Not paid</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={4}>
                        {" "}
                        {Number(item.price).toFixed(2)} LKR X {item.quantity} ={" "}
                        {Number(item.price * item.quantity).toFixed(2)} LKR
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivary price</Col>
                  <Col>{Number(order.shippingPrice).toFixed(2)} LKR </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total price</Col>
                  <Col>{Number(order.totalPrice).toFixed(2)} LKR </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
