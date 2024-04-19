import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating";
import React from "react";

function product({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      style={{ textDecoration: "none" }}
    >
      <Card border="light" bg="info" text="light" className="my-3 p-3 rounded">
        <Card.Header as="div" className="product-title" style={{margin:"auto"}}>
          <h3>{product.name}</h3>
        </Card.Header>

        <Card.Body>
          <Card.Img src={product.image} style={{ height: "50vh" }} />
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">LKR : {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default product;
