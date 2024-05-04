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
  Container,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../content/Message";
import React from "react";
import { addToCart, remFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const addToCartHandler = async (itm, quantity) => {
    dispatch(addToCart({ ...itm, quantity }));
  };

  const remFromCartHandler = async (id) => {
    dispatch(remFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Container className="py-5">
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
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}> {item.name} </Link>
                    </Col>
                    <Col md={2}>LKR : {item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => {
                          addToCartHandler(item, Number(e.target.value));
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        style={{backgroundColor:"red",borderWidth:"2px"}}
                        onClick={() => remFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  {" "}
                  Sub-Total (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items{" "}
                </h2>
                <h4>
                  LKR :{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="success"
                  style={{backgroundColor:"green",borderWidth:"2px"}}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  {" "}
                  Proceed to checkout{" "}
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                {userInfo !== null ? (
                  <Button
                    type="button"
                    variant="success"
                    style={{backgroundColor:"blue",borderWidth:"2px"}}
                    disabled={userInfo === null}
                    onClick={(e) => navigate(`/orderst/myorders/${userInfo._id}`)}
                  >
                    {" "}
                    My orders{" "}
                  </Button>
                ) : (
                  <Message> Log in to view all orders </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
