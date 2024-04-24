import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    const navigate = useNavigate();
    
    const [inputdata,setInputdata]=useState({
        "name":"",
        "email":"",        
        "contact":""
    })
    
    //onchange function
    const setstud=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setInputdata((prestud)=>{
            return{
                ...prestud,[name]:value
            }
        })
    }


    //get single data student
    const { id } = useParams("");
    console.log(id);

    const getstuddata = async () => {
        const res = await fetch(`http://localhost:5000/getstud/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    //update student Data
    const updatestud= async(e)=>{
        e.preventDefault();

        const {name, email, contact} =inputdata;


         // Check if name is not empty
         if (!name) {
            toast.error('Please enter a valid name', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
            });
            return;
        }
    
        // Check if email is valid
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
            });
            return;
        }
    
        // Check if contact number is valid
        const contactRegex = /^\d{10}$/;
        if (!contactRegex.test(contact)) {
            toast.error('Please enter a valid 10-digit contact number', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }




        const res2 = await fetch(`http://localhost:5000/updatestud/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email, contact
            })
        });
        const data2= await res2.json();
        setInputdata(data2);
        toast.success('Please wait  !', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            progress: undefined,
            });
        setTimeout(() => {
            navigate('/allpayments');
          }, 3000);


    }

    return (
        <div className='container mt-5'>
            <center><h4>Edit Payment Information</h4>
            <div className='underline1'></div></center>
            <form className='mt-5 shadow p-5 w-75' style={{backgroundColor: '#B9EBFF', maxWidth: '50%', alignItems: 'center', margin: '0 auto'}}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Name" 
                    onChange={setstud} name="name" value={inputdata.name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Email Address</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email Address"
                    onChange={setstud} name="email" value={inputdata.email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Mobile</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Contact Number"
                    onChange={setstud} name="contact" value={inputdata.contact}/>
                </div>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={updatestud}>Update</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allpayments">Back to Home</NavLink>
                </div>
              

            </form>

             {/* Bottom photo */}
             <div className="text-center mt-5">
                <img src="../image/7011023.jpg" alt="Bottom Photo" style={{ maxWidth: '100%', height: '400px' }} />
            </div>
        </div>
    )
}
