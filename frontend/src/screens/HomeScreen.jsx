import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../content/product";
import axios from "axios";
import backgroundImage from "../img/wavesyncBG.jpg"
import "../index.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/product/");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>Latest products</h1>
        <Row style={{margin:"10px"}}>
          {products.map((products) => (
            <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={products} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomeScreen;
