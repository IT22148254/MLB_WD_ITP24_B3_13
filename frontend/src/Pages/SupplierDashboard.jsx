import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'

const SupplierDashboard = () => {

    return (
        <Container>
                <div className="title code">Supplier Manager Dashboard</div>
                {/* <Row>
                    <img src={image} alt="" className='' />
                </Row>
                <br /> */}
                <Row className='om_btn'>
                    <Col>
                        <Container >
                            <button><a><p id='ed'>Supplier</p></a></button>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <button><a><p id='ed'>Orders</p></a></button>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <button><a><p id='ed'>Inventory</p></a></button>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <button><a><p id='ed'>Invoices</p></a></button>
                        </Container>
                    </Col>
                </Row>
            </Container>
      );
}
 
export default SupplierDashboard;