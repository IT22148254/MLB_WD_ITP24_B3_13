
import React from 'react'
import { Container, Row, Col, Table, Button } from 'reactstrap'

const MMDashboard = () => {

    return (  
        <Container>
                <div className="title code">Membership Manager Dashboard</div>
                <br />
                <Row className='om_btn'>
                    <Col>
                        <Container >
                            <button><a><p id='ed'>Standard Packages</p></a></button>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <button><a><p id='ed'>Promo Packages</p></a></button>
                        </Container>
                    </Col>
                </Row>
            </Container>
    );
}
 
export default MMDashboard;

