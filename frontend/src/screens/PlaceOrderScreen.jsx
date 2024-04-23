import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../content/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../content/Message";
import Loader from "../content/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder,{isLoading,error}] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/store/paymentt");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async() => {
    try {
        console.log(cart.cartItems)
        const res = await createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemPrice,
            shippingPrice:cart.delPrice,
            totalPrice:cart.totPrice

        }).unwrap();
        console.log(res)
        dispatch(clearCartItems())
        navigate(`/store/orderst/${res._id}`)

    } catch (error) {
        toast.error(error)
    }
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row className="mx-4">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong> {cart.shippingAddress.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Method : </strong> {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items : </h2>{" "}
              {cart.cartItems.length === 0 ? (
                <Message> No items in the cart </Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {" "}
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />{" "}
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {" "}
                          {Number(item.price).toFixed(2)} LKR X {item.quantity}{" "}
                          = {Number(item.price * item.quantity).toFixed(2)} LKR
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                  <Col>Items price</Col>
                  <Col>{Number(cart.itemPrice).toFixed(2)} LKR </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivary price</Col>
                  <Col>{Number(cart.delPrice).toFixed(2)} LKR </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total price</Col>
                  <Col>{Number(cart.totPrice).toFixed(2)} LKR </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message varient='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >Place order</Button>
                {isLoading && <Loader/>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
