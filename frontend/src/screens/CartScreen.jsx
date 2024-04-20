import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Form,
  Image,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../content/Message";
import React from "react";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Row>
      <Col md="8">
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            {" "}
            Your cart is Empty <Link to="/store"> Go back </Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {
            cartItems.map( (item) => (
                <ListGroup.Item key={item._id}>
                    <Row>
                        <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))
            }
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;
