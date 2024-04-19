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
import Rating from "../content/rating";
import { useGetOneProductQuery } from "../slices/productsApiSlice";
import Loader from "../content/Loader";
import Message from "../content/Message";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetOneProductQuery(productId);

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
            <div>
              <Image
                src={product.image}
                alt={product.name}
                style={{ height: "55vh",width:"auto"}}
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
                <ListGroupItem>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
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
