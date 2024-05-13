import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminPortalScreen = () => {

    const navigate = useNavigate()

  return (
    <center>
      <ListGroup>
        <ListGroup.Item>
          <Button onClick={(e)=> navigate('/store/admin/items')}>Items</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={(e)=> navigate('/store/admin/orders')} >Orders</Button>
        </ListGroup.Item>
      </ListGroup>
    </center>
  );
};

export default AdminPortalScreen;
