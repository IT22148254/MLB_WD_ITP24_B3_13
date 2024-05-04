import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../content/rating";
import { useGetOneProductQuery } from "../slices/productsApiSlice";
import Loader from "../content/Loader";
import Message from "../content/Message";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetOneProductQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
    navigate("/cart");
  };

  return (
    <div style={{ margin: "20px", padding: "20px" }}>
      <Link className="btn btn-light my-3" to="/store">
        Go back
      </Link>

      {isLoading ? (
        <div style={{ margin: "auto", marginTop: "100px" }}>
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">{isError.error}</Message>
      ) : (
        <Row>
          <Col md={5} sm={12}>
            <div style={{ maxWidth: "100%", overflow: "hidden" }}>
              <Image
                src={product.image}
                alt={product.name}
                style={{ height: "75vh", width: "100%" }}
              />
            </div>
          </Col>
          <Col md={4} sm={12}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                ></Rating>
              </ListGroupItem>
              <ListGroupItem> Price : LKR : {product.price}</ListGroupItem>
              <ListGroupItem>
                {" "}
                Description : {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3} sm={12}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>LKR : {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroupItem>
                  <Button
                    className="btn-block"
                    style={{backgroundColor:"blue",borderWidth:"2px"}}
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    {" "}
                    Add to cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
