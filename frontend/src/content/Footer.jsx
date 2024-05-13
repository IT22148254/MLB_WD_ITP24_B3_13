import React from "react";
import { Container, Row,Col } from "react-bootstrap";

function Footer() {
  const cy = new Date().getFullYear();
  return (
    <Container>
      <Row>
        <Col className="text-center py-3">
          <p> WaveSync &copy; {cy} </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
