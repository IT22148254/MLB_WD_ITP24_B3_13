import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../content/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [street, setStreet] = useState(shippingAddress?.street || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [district, setDistrict] = useState(shippingAddress?.district || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, street, city, district }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <h1>Shipping</h1>

        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="street" className="my-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            value={street}
            placeholder="Enter street"
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="district" className="my-3">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            value={district}
            placeholder="Enter district"
            onChange={(e) => setDistrict(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <center>
          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </center>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
