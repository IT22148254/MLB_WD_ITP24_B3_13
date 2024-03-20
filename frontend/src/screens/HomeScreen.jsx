import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../content/product";
import products from "../products";
function homeScreen() {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((products) => (
          <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={products} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default homeScreen;
