import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'reactstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { AiFillCalendar, AiOutlineSearch } from "react-icons/ai"
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Swal from "sweetalert2"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

const CreatedPromosTable = () => {
    // const bgStyle = {
    //     backgroundImage: `url(${bg})`,
    //     backgroundSize: "cover",
    //     height: "100%",
    //   };

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date())
    const [promos, setPromos] = useState([]);
    let navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchPkgs = async () => {
            try {
                const { data } = await axios.get('http://localhost:8070/package/propackage');
                setPromos(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchPkgs();
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
                axios.delete(`http://localhost:8070/package/propackage/${id}`)
                    .then(response => {

                        // Refresh the table to show updated data
                        Swal.fire({
                            title: "Success",
                            text: "Package rejected successfully",
                            icon: "success",
                        }).then(() => {
                            console.log('Package rejected successfully')
                        })

                        window.location.reload();

                    })
                    .catch(error => {

                        Swal.fire({
                            title: "Error",
                            text: "package rejection failed",
                            icon: "success",
                        }).then(() => {
                            console.log('Error rejecting package:', error);

                        })

                    })
            }
        });

    }

    const handleSend = () => {

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
                }).then(() => {
                    console.log('package sent to approval successfully')
                })

            }
        }
        )
    }

    const handleEdit = (id) => {
        
        navigate(`/pkg/editpromo/${id}`);
    };


    const handleCreateReport = () => {
        // initialize the PDF document
        const doc = new jsPDF();

        // add title to the PDF document
        doc.setFontSize(16);
        doc.text('Promo Package Report', 14, 22);


        // define the table columns
        const columns = [
            { header: 'Package Name', dataKey: 'Name' },
            { header: 'Description', dataKey: 'Discription' },
            { header: 'Price', dataKey: 'Price' },
            { header: 'Valid Until', dataKey: 'Duration' }
        ];

        // define the table rows
        const rows = promos.map(promo => ({
            Name: promo.Name,
            Discription: promo.Discription,
            Price: promo.Price,
            Duration: promo.Duration
        }));

        // add the table to the PDF document
        doc.autoTable(columns, rows);

        // save the PDF file
        doc.save('Promo Package report.pdf');
    }
    return (
        <section>
            <Container>
                <div>
                    <div className="flex h-full justify-center items-center ">
                        <div className="bg-black/45 w-5/8 h-auto rounded-[50px] py-12 px-14 flex flex-col gap-y-8">
                            <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>Created Promos</p>

                            <br />
                            {/* <Row>
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
            </Row> */}



                            <Row>
                                <Col lg="12">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <label htmlFor="search" className="text-2xl text-white font-bold align-top mb-15 ml-10">Search : </label>

                                            <input
                                                type="text"
                                                id="search"
                                                name="search"
                                                className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                                                placeholder="Search"
                                                value=""
                                            />
                                            {/* <div className="pl-3">
                        <AiOutlineSearch className="text-gray-900 w-5 h-5 " />
                    
                    </div> */}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Table className="min-w-70% divide-y divide-gray-200">
                                    <thead className="bg-blue-700 text-white ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Package Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Details
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Validity
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Edit
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Delete
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase border border-black">
                                                Send
                                            </th>
                                        </tr>

                                        {/* <th>
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
                            Approve
                        </th>
                        <th>
                            Reject
                        </th> */}
                                    </thead>
                                    <tbody className="bg-blue-200 divide-y divide-gray-200">
                                        <tr className="text-gray-700">
                                            {promos.length > 0 ? (promos.map((prm) => (//map is a function which can loop through one by one

                                                <tr className="px-3 py-4 whitespace-nowrap border border-black" key={prm._id}>
                                                    <td className="px-3 py-4 whitespace-nowrap border border-black">{prm.Name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-black">{prm.Discription}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-black">{prm.Price}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-black">{prm.Duration}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-black">
                                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleEdit(prm._id)}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-black">
                                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleDelete(prm._id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={handleSend}>
                                                            Send
                                                        </button>
                                                    </td>
                                                </tr>


                                            ))) : (<h1>no promos</h1>)}

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
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <Col>
                                    <button type="" className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300" onClick={handleCreateReport}>
                                        Generate Report
                                    </button>
                                    {/* <button type='' className='primary__btn submit'onClick={handleCreateReport}>Generate Report</button> */}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

    )
}

export default CreatedPromosTable;
