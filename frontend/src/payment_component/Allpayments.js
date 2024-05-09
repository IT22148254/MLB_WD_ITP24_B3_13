import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function Allpayments() {

    const [getstud, SetGetstud] = useState([]);
    console.log(getstud)
    //get student Data
    const getstuddata = async () => {

        const res = await fetch("http://localhost:8070/payment/getstud", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetstud(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    //Delete student data
    const deletestud = async (id) => {

        const res2 = await fetch(`http://localhost:8070/payment/deletestud/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            getstuddata();

        }

    }
    //search Student
    const [searchInput,setSearchInput]=useState('');
    const searchStud=(searchval)=>{
        setSearchInput(searchval)
    }

    //Generate report
    const generatePDF = () => {
        // create new PDF object
        const doc = new jsPDF();
    
        // set company name
        const companyName = 'INSTITUTE OF SLIIT';
        // set current date and time
        const today = new Date();
        const date = today.toLocaleDateString();
        const time = today.toLocaleTimeString();
    
        // add company name and date/time to PDF
        doc.text(`${companyName}\nReport Generated on: ${date} at ${time}`, 14, 20);
    
        // add table data to PDF
        doc.autoTable({
            startY: 40, // set Y position to start the table
            head: [['No', 'Name', 'Email', 'Contact']],
            body: getstud.map((result, id) => [id + 1, result.name, result.email, result.contact])
        });
    
        // save PDF file
        doc.save('report.pdf');
    }
    
    


    return (
        <div className='container mt-5'>
            <div className='d-flex'>
                <h4>All Payment Information</h4>
                <div class="ms-auto w-50">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Search Name" 
                        onChange={(e)=>searchStud(e.target.value)}
                    />
                </div>
            </div>

            <div className='underline'></div>
            <br/>    
            <button className='btn btn-primary' onClick={() => generatePDF()}>Generate Report</button>
            <table className="table table-bordered mt-5">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>                    
                        <th scope="col">Contact </th>
                        <th scope="col">Action </th>
                    </tr>
                </thead>
                <tbody>

                    {getstud.filter((val)=>{
                        if(searchInput === ""){
                            return val
                        }else if(val.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return val; 
                        }return false; // added return statement
                    }).map((result, id) => {
                        return (
                            <>

                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.name}</td>
                                    <td>{result.email}</td>                                    
                                    <td>{result.contact}</td>
                                    <td>
                                        <Link className='btn btn-success ms-2' to={`/payment/view/${result._id}`}>View</Link>
                                        <Link className='btn btn-warning ms-2' to={`/payment/edit/${result._id}`}>Update</Link>
                                        <button className='btn btn-danger ms-2'
                                            data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deletestud(result._id)}>Delete</button>
                                    </td>
                                </tr>


                            </>
                        )
                    })}




                </tbody>
            </table>

             {/* Bottom photo */}
      <div className="text-center mt-5">
        <img
          src="../image/7011020.jpg"
          alt="Bottom Photo"
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        />
      </div>


        </div>
    )
}
