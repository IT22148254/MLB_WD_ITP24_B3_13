import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FormContainer from "../content/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../content/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [street, setStreet] = useState(shippingAddress?.street || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [district, setDistrict] = useState(shippingAddress?.district || "");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(cart)

  const submitHandler = (e) => {
    e.preventDefault();

    if (!address || !street || !city || !district) {
      setShowError(true);
      return;
    }

    setShowError(false);

    console.log(cart)

    dispatch(saveShippingAddress({ address, street, city, district }));
    navigate("/store/payment");
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>

        <CheckoutSteps step1 step2/>

        <h1 className="text-2xl font-semibold">Shipping</h1>

        {showError && (
          <Alert variant="danger">Please fill in all fields.</Alert>
        )}

        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            className={`form-control ${!address && showError && 'border-red-500'}`}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="street" className="my-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            value={street}
            placeholder="Enter street"
            onChange={(e) => setStreet(e.target.value)}
            className={`form-control ${!street && showError && 'border-red-500'}`}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            className={`form-control ${!city && showError && 'border-red-500'}`}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="district" className="my-3">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            value={district}
            placeholder="Enter district"
            onChange={(e) => setDistrict(e.target.value)}
            className={`form-control ${!district && showError && 'border-red-500'}`}
          ></Form.Control>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
