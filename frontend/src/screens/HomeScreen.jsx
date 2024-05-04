import React, { useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import Product from "../content/product";
// import axios from "axios";
// import { useState, useEffect } from "react";
import backgroundImage from "../img/wavesyncBG.jpg";
import "../index.css";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../content/Loader";
import Message from "../content/Message";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../content/FormContainer";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/product/");
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
          <Row>
            <Col>
              <FormContainer>
                <Form>
                  <InputGroup>
                    <Form.Control
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Enter an item"
                      className="mt-3"
                    />
                  </InputGroup>
                </Form>
              </FormContainer>
            </Col>
            {user.userInfo === null ? (
              <></>
            ) : (
              <Col md={3}>
                {user.userInfo.AccLevel !== "customer" ? (
                  <center>
                    <Button
                      variant="warning"
                      className="mt-3"
                      style={{backgroundColor:"#f0ad4e",borderWidth:"2px"}}
                      onClick={(e) => navigate("/store/admin")}
                    >
                      Admin portal
                    </Button>
                  </center>
                ) : (
                  <></>
                )}
              </Col>
            )}
          </Row>
          <Row style={{ margin: "10px" }}>
            {products.filter((item) => { return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)}).map((products) => (
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
