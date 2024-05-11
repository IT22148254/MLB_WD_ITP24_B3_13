import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

function MMdashboard() {
    return (
        <>
            <Container>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Membership Manager Dashboard</div>
                <br />
                <Row style={{ marginTop: '20px' }}>
                    <Col>
                        <Container>
                            <Link className='btn btn-success ms-2' to={`/pkg/addnewpr`}>Standard Packages</Link>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Link className='btn btn-success ms-2' to={`/pkg/addnewpr`}>Promo Packages</Link>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MMdashboard;
