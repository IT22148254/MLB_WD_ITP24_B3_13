import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'reactstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { AiFillCalendar, AiOutlineSearch } from "react-icons/ai"
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Swal from "sweetalert2"
import axios from 'axios'

const CreatedPromosTable = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [promos, setPromos] = useState([])

    useEffect(()=>{

        const fetchPromo = async () => {

            try {
                const response = await axios.get("http://localhost:8000/PromoPackages");
                setPromos(response.data);
            } catch (error) {
                console.log('Error fetching Promo Packages:', error);
            }
            
        };

        fetchPromo();
    }, []);

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/PromoPackages/${id}`)
            .then(response => {

                // Refresh the table to show updated data
                Swal.fire({
                        title: "Success",
                        text: "Package rejected successfully",
                        icon: "success",
                      }).then(()=>{
                        console.log('Package rejected successfully')
                      })

                window.location.reload();

            })
            .catch(error => {

            Swal.fire({
                        title: "Error",
                        text: "package rejection failed",
                        icon: "success",
                      }).then(()=>{
                        console.log('Error rejecting package:', error);

                      })

            })
              }
          });
      
    }

    const handleSend  = (id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept it!",
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Success",
                    text: "package sent to approval successfully",
                    icon: "success",
                  }).then(()=>{
                    console.log('package sent to approval successfully')
                  })
            
            }
        }
    )
    }

    const handleEdit = (id) => {
        // console.log(`Edit promo with id: ${id}`);
        // navigate(`/edit/${id}`);
      };
    

    const handleCreateReport = () => {
        // initialize the PDF document
        const doc = new jsPDF();

        // add title to the PDF document
        doc.setFontSize(16);
        doc.text('Promo Package Report', 14, 22);
        
      
        // define the table columns
        const columns = [     
            { header: 'Package Name', dataKey: 'prPackageName' },    
            { header: 'Description', dataKey: 'prPackageDescription' },    
            { header: 'Price', dataKey: 'prPackagePrice' },    
            { header: 'Valid Until', dataKey: 'prPackageValidity' }  
        ];
        
        // define the table rows
        const rows = promos.map(promo => ({
            prPackageName: promo.prPackageName,
            prPackageDescription:promo.prPackageDescription,
            prPackagePrice:promo.prPackagePrice,
            prPackageValidity:promo.prPackageValidity
        }));
        
        // add the table to the PDF document
        doc.autoTable(columns, rows);
        
        // save the PDF file
        doc.save('Promo Package report.pdf');
    }
    return (
        <section>
            <Container>
                <div className="title code">Created Promo Packages</div>
                <br />
                <Row>
                    <Col>
                        <Row>
                            <Col lg='3'>
                                <label for="from">From :</label>
                            </Col>
                            <Col>
                                <DatePicker className='calender' selected={startDate} onChange={(date) => setStartDate(date)} />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col lg='2'>
                                <label for="to">to :</label>
                            </Col>
                            <Col>
                                <DatePicker className='calender' selected={endDate} onChange={(date) => setEndDate(date)} />
                            </Col>
                            <Col>
                                <AiFillCalendar className="i" />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col> <input type="text" className='search' value="" /></Col>
                            <Col> <AiOutlineSearch className="i" /></Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Table dark striped bordered hover responsive>
                        <thead >
                            <th>
                                Date
                            </th>
                            <th>
                                Package Name
                            </th>
                            <th>
                                Details
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Validity
                            </th>
                            <th>
                                Send
                            </th>
                            <th>
                                Delete
                            </th>
                        </thead>
                        <tbody>
                        {promos && promos.map((prm) => (//map is a function which can loop through one by one
                                <tr key={prm.id}>
                                <td>{prm.prPackageName}</td>
                                <td >{prm.prPackageDescription}</td>
                                <td >{prm.prPackagePrice}</td>
                                <td >{prm.prPackageValidity}</td>
                                <td><button className='reject_btn 'onClick={() => handleEdit()}>Edit</button></td>
                                <td><button className='reject_btn 'onClick={() => handleDelete(prm.id)}>Delete</button></td>
                                <td><button className='accept_btn 'onClick={handleSend}>Send</button></td>
                                
                            </tr>
                            ))}

                            {/*<tr >
                                <td>06/03/2024</td>
                                <td>PROMO#123</td>
                                <td>New Year Promo Package</td>
                                <td>Weekday traning sessions,<br />1 Kg supplement package included</td>
                                <td>LKR 2500</td>
                                <td>30/04/2023</td>
                                <td><button className='approve_btn '>Approve</button></td>
                                <td><button className='reject_btn '>Reject</button></td>
                            </tr>
                            <tr>
                                <td>06/03/2024</td>
                                <td>PROMO#123</td>
                                <td>New Year Promo Package</td>
                                <td>Weekday traning sessions,<br />1 Kg supplement package included</td>
                                <td>LKR 2500</td>
                                <td>30/04/2023</td>
                                <td><button className='approve_btn '>Approve</button></td>
                                <td><button className='reject_btn '>Reject</button></td>
                            </tr>
                            <tr>
                                <td>06/03/2024</td>
                                <td>PROMO#123</td>
                                <td>New Year Promo Package</td>
                                <td>Weekday traning sessions,<br />1 Kg supplement package included</td>
                                <td>LKR 2500</td>
                                <td>30/04/2023</td>
                                <td><button className='approve_btn '>Approve</button></td>
                                <td><button className='reject_btn '>Reject</button></td>
                            </tr>
                            <tr >
                                <td>06/03/2024</td>
                                <td>PROMO#123</td>
                                <td>New Year Promo Package</td>
                                <td>Weekday traning sessions,<br />1 Kg supplement package included</td>
                                <td>LKR 2500</td>
                                <td>30/04/2023</td>
                                <td><button className='approve_btn '>Approve</button></td>
                                <td><button className='reject_btn '>Reject</button></td>
    </tr>*/}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Col>
                        <button type='' className='primary__btn submit'onClick={handleCreateReport}>Generate Report</button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default CreatedPromosTable;
