
import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'

function MMdashboard() {
    return (
        <>
            <Container>
                <div className="title code">Membership Manager Dashboard</div>
                <br />
                <Row className='om_btn'>
                    <Col>
                        <Container >
                            <a><p id='ed'>Standard Packages</p></a>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <a><p id='ed'>Promo Packages</p></a>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MMdashboard;