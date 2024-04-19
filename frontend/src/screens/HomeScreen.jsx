import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../content/product";
// import axios from "axios";
// import { useState, useEffect } from "react";
import backgroundImage from "../img/wavesyncBG.jpg";
import "../index.css";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../content/Loader";
import Message from "../content/Message";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/product/");
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <div>
      {isLoading ? (
        <div style={{ margin: "auto", marginTop: "100px" }}>
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">{isError.error}</Message>
      ) : (
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>Latest products</h1>
          <Row style={{ margin: "10px" }}>
            {products.map((products) => (
              <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={products} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
