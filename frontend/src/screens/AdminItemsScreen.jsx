import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdNoteAdd, MdCreateNewFolder } from "react-icons/md";
import { useGetProductsQuery,useCreateProductMutation } from "../slices/productsApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../content/Loader";
import { ListGroup, Row, Image, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminItemsScreen = () => {
  const { data: products, isLoading, isError,refetch } = useGetProductsQuery();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [createProduct,{isLoading:crLoading}] = useCreateProductMutation();

  const editHandler = (id) => {
    console.log("edited - ", id);
    navigate(`/store/admin/item/${id}/edit`)
  };

  const deleteHandler = (id) => {
    console.log("deleted - ", id);
  };

  const createHandler = async () => {
    if(window.confirm('Are you sure you want to create a new product ?')){
        try {
            await createProduct();
            refetch();
        } catch (error) {
            toast.error(error)
        }
    }
    console.log("created ");
  };

  const reportHandler = () => {
    console.log("generated report");
  };

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return console.log(Error);
  }

  if(crLoading){
    return <Loader/>
  }

  return (
    <>
      <Row className="my-3 mx-3">
        <Col md={8}></Col>
        <Col md={2}>
          <center>
            <Button variant="success" onClick={(e) => createHandler()} >
              <MdCreateNewFolder />
            </Button>
          </center>
        </Col>
        <Col md={2}>
          <center>
            <Button variant="info" onClick={(e) => reportHandler()}>
              <MdNoteAdd />
            </Button>
          </center>
        </Col>
      </Row>

      <ListGroup className="my-3 mx-3">
        {products.map((product) => (
          <ListGroup.Item className="my-3 mx-2" key={product._id}>
            <Row>
              <Col md={1}>
                <Image src={product.image} fluid rounded />
              </Col>
              <Col md={2}> ID : {product._id} </Col>
              <Col md={2}> Name : {product.name} </Col>
              <Col md={2}> Stock : {product.countInStock} </Col>

              <Col md={1}> </Col>
              <Col md={2}>
                <Button variant="warning" onClick={(e) => editHandler(product._id)}>
                  <FaEdit />
                </Button>{" "}
              </Col>
              <Col md={2}>
                <Button variant="danger" onClick={(e) => deleteHandler(product._id)} >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default AdminItemsScreen;
