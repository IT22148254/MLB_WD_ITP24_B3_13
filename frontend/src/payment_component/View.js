import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function View() {
    const [getstud, SetGetstud] = useState([]);
    const { id } = useParams("");
    console.log(id);

    const getstuddata = async () => {
        const res = await fetch(`http://localhost:8070/payment/getstud/${id}`, {
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
    }, [id]);

    return (
        <div className='container mt-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <center><h4>User Payment Information</h4>
            <div className='underline'></div></center>
            <ul className="list-group w-50 mt-4">
                <li className="list-group-item active" aria-current="true">Information About</li>
                <li className="list-group-item">Name :- {getstud.name}</li>
                <li className="list-group-item">Email :- {getstud.email}</li>
                <li className="list-group-item">Mobile Number :- {getstud.contact}</li>
            </ul>
            <Link className='btn btn-primary mt-5' to="/payment/all">Back</Link>
            <div className="mt-5">
                <img src="/image/7011020.jpg" alt="Photo" style={{ maxWidth: '100%', maxHeight: '400px' }}/>
            </div> 
        </div>
    )
}
