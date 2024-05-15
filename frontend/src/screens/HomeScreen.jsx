import React, { useState } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import Product from "../content/product";
// import Header from "../content/header";
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
        overflow: "hidden",
        backgroundPosition: "center",
      }}
    >
      {/* <Header /> */}
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
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-3"
                      onClick={(e) => navigate("/store/admin")}
                    >
                      Admin portal
                    </button>
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
      <div className="bg-blue-200">
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;
