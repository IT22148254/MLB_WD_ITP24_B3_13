import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'
import bg from "../Images/bg_main.jpg";

const SupplierDashboard = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };

  return (
    <div style={bgStyle}>
      <div className="flex h-full justify-center items-center ">
        <div className="bg-black/45 w-5/8 h-auto rounded-[50px] py-12 px-14 flex flex-col gap-y-4"> {/* Reduced gap-y */}
          <p className="text-4xl text-white font-bold mb-8" style={{ WebkitTextStroke: '1px black' }}>Supplier Manager Dashboard</p> {/* Removed align-top and mb-0 */}
          <Row className='om_btn'>
            <Col>
              <Container className="flex justify-between" >
                <button className="mr-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                  <a><p id='ed'>Supplier</p></a>
                </button>
                <button className="ml-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                  <a><p id='ed'>Order</p></a>
                </button>
              </Container>
              <br />
              <Container className="flex justify-between" >
                <button className="mr-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                  <a><p id='ed'>Inventory</p></a>
                </button>
                <button className="ml-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                  <a><p id='ed'>Invoices</p></a>
                </button>
              </Container>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;