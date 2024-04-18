import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'

const SupplierDashboard = () => {

    return (
        <Container>
                <div className="title code">Supplier Manager Dashboard</div>
                <Row>
                    <img src={image} alt="" className='' />
                </Row>
                <br />
                <Row className='om_btn'>
                    <Col>
                        <Container >
                            <a><p id='ed'>Orders</p></a>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <a><p id='ed'>Inventory</p></a>
                        </Container>
                    </Col>
                </Row>
            </Container>
      );
}
 
export default SupplierDashboard;