import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import products from "../products";
import Rating from "../content/rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => {
    return p._id === productId;
  });

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
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
            <ListGroupItem> Description : {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
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
              <ListGroupItem>
                <Button className="btn-block" type="button" disabled = {product.countInStock === 0}> Add to cart</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
