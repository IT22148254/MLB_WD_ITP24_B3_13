import React, { useRef } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  MdNoteAdd,
  MdCreateNewFolder,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useRemoveProductMutation,
} from "../slices/productsApiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../content/Loader";
import { ListGroup, Row, Image, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminItemsScreen = () => {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const navigate = useNavigate();
  const listRef = useRef(null);

  const [createProduct, { isLoading: crLoading }] = useCreateProductMutation();
  const [removeProduct, { isLoading: rmLoading }] = useRemoveProductMutation();

  const editHandler = (id) => {
    console.log("edited - ", id);
    navigate(`/store/admin/item/${id}/edit`);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the product ?")) {
      try {
        await removeProduct(id);
        refetch();
        toast.success("Deleted successfully");
      } catch (error) {
        toast.error("Delete unsuccessful");
      }
    }
  };

  const createHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product ?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product added successfully");
      } catch (error) {
        toast.error("Could not add the product");
      }
    }
  };

  function convertToCSV(reportData) {
    const headers = Object.keys(reportData[0]).join(",");
    const rows = reportData
      .map((item) => Object.values(item).join(","))
      .join("\n");
    return `${headers}\n${rows}`;
  }

  const reportHandler = () => {
    const csvContent = convertToCSV(products);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("generated report");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToNextOutOfStockItem = () => {
    const nextOutOfStockItem = products.find(
      (product) => product.countInStock === 0
    );
    if (nextOutOfStockItem) {
      const itemIndex = products.indexOf(nextOutOfStockItem);
      const listItem = document.getElementById(`product_${itemIndex}`);
      listItem.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.info("No more out-of-stock items");
    }
  };

  const scrollToNextOutOfStockClose = () => {
    const nextOutOfStockClose = products.find(
      (product) => product.countInStock < 8 && product.countInStock > 0
    );
    if (nextOutOfStockClose) {
      const itemIndex = products.indexOf(nextOutOfStockClose);
      const listItem = document.getElementById(`product_${itemIndex}`);
      listItem.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.info("No more close-to-out-of-stock items");
    }
  };

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return console.log(Error);
  }

  if (crLoading || rmLoading) {
    return <Loader />;
  }

  return (
    <>
      <Row className="my-3 mx-3">
        <Col md={8}></Col>
        <Col md={2}>
          <div className="text-center">
            <Button variant="success" className="bg-green-500" onClick={(e) => createHandler()}>
              <MdCreateNewFolder className="inline-block mr-2" />
              Create Product
            </Button>
          </div>
        </Col>
        <Col md={2}>
          <div className="text-center">
            <Button variant="info" className="bg-blue-400" onClick={(e) => reportHandler()}>
              <MdNoteAdd className="inline-block mr-2" />
              Generate Report
            </Button>
          </div>
        </Col>
      </Row>

      <ListGroup className="my-3 mx-3">
        {products.map((product, index) => (
          <ListGroup.Item
            className={`my-3 mx-2 border-4 rounded-xl
            ${
              product.countInStock === 0
                ? "border-red-500"
                : product.countInStock < 8
                ? "border-yellow-500"
                : "border-green-500"
            }`}
            key={product._id}
            id={`product_${index}`} // Add an ID to each ListGroup.Item for reference
          >
            <Row className="items-center">
              <Col md={1}>
                <Image src={product.image} fluid rounded key={index} />
              </Col>
              <Col md={2}> ID: {product._id} </Col>
              <Col md={2}> Name: {product.name} </Col>
              <Col md={2}> Stock: {product.countInStock} </Col>
              <Col md={1}></Col>
              <Col md={2}>
                <Button
                  variant="warning"
                  className="bg-yellow-300"
                  onClick={(e) => editHandler(product._id)}
                >
                  <FaEdit />
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  variant="danger"
                  className="bg-red-500"
                  onClick={(e) => deleteHandler(product._id)}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div ref={listRef} />

      <div className="fixed bottom-10 right-10 z-50">
        <Button className="opacity-80 bg-blue-300 mx-2" onClick={scrollToTop}>
          <MdArrowUpward />
        </Button>
        <Button
          variant="warning"
          className="opacity-80 bg-yellow-300 mx-2"
          onClick={scrollToNextOutOfStockClose}
        >
          <MdArrowDownward />
        </Button>
        <Button
          variant="danger"
          className="opacity-80 bg-red-300 mx-2"
          onClick={scrollToNextOutOfStockItem}
        >
          <MdArrowDownward />
        </Button>
      </div>
    </>
  );
};

export default AdminItemsScreen;
