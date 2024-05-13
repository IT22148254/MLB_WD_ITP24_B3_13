import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Alert, Button } from "react-bootstrap";
import Message from "../content/Message";
import Loader from "../content/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import React from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  console.log(order)

  const generatePDF = () => {
    const doc = new jsPDF();

    const companyName = "WaveSync";
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    doc.text(
      `${companyName} \nReceipt generated on : ${date} at ${time}`,
      14,
      20
    );

    doc.text(
      `Delivary price : ${Number(order.shippingPrice).toFixed(2)} LKR  Total price : ${Number(order.totalPrice).toFixed(2)} LKR`,
      19,
      39
    );

    doc.autoTable({
      startY: 50,
      head: [["Name", "Price", "Quantity"]],
      body: order.orderItems.map((item) => [
        item.name,
        item.price,
        item.quantity,
      ]),
    });

    doc.save(`Receipt ${order._id}.pdf`);
    
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1 className="text-2xl font-semibold">Order {order._id}</h1>

      <Row className="my-4">
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2 className="text-xl font-semibold">Shipping</h2>
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
                <Alert variant="success">
                  Order is delivered: {order.deliveredAt}
                </Alert>
              ) : (
                <Alert variant="danger">Order is not delivered</Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-xl font-semibold">Payment method</h2>
              <p>
                <strong>Method : </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant="success">Paid: {order.paidAt}</Alert>
              ) : (
                <Alert variant="danger">Not paid</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="text-xl font-semibold">Order Items</h2>
              <ListGroup>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={8} className="flex items-center">
                        <span className="mr-2">
                          {Number(item.price).toFixed(2)} LKR X {item.quantity} ={" "}
                        </span>
                        <span>{Number(item.price * item.quantity).toFixed(2)} LKR</span>
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
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-2">
                  <Col>Delivery price</Col>
                  <Col>{Number(order.shippingPrice).toFixed(2)} LKR</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-2">
                  <Col>Total price</Col>
                  <Col>{Number(order.totalPrice).toFixed(2)} LKR</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="my-2">
                <Button className="bg-blue-500" onClick={generatePDF}>Generate Receipt</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
