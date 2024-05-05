import React, { useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import Product from "../content/product";
import Header from "../content/header";
import Footer from "../content/Footer";
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
    <div
      className="h-screen overflow-y-scroll"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      {isLoading ? (
        <div style={{ margin: "auto", marginTop: "100px" }}>
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">{isError.error}</Message>
      ) : (
        <div>
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
                      onClick={(e) => navigate("/store/admin")}
                    >
                      {" "}
                      Admin portal
                    </Button>
                  </center>
                ) : (
                  <></>
                )}
              </Col>
            )}
          </Row>
          <div className="grid mt-10 mb-10 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((products) => (
                <Product product={products} />
              ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomeScreen;
