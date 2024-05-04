


import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'
const FeedbackDashboard = () => {

    return (  
        <Container>
                <div className="title code">Feedback Manager Dashboard</div>
                <br />
                <Row className='om_btn'>
                    <Col>
                        <Container >
                            <a><p id='ed'>Feedback handling</p></a>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <a><p id='ed'>Inquiry Handling</p></a>
                        </Container>
                    </Col>
                </Row>
            </Container>
    );
}
 
export default FeedbackDashboard;