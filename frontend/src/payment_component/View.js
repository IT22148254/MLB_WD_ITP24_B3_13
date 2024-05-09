import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function View() {
    const [getstud, SetGetstud] = useState({});
    const { id } = useParams("");
    console.log(id);

    const getstuddata = async () => {
        try {
            const res = await fetch(`http://localhost:5000/getstud/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                console.log("error");
            } else {
                SetGetstud(data);
                console.log("get data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getstuddata();
    }, [id]);

    //Genarate report
    const generatePDF = () => {
        // Create new PDF object
        const doc = new jsPDF();
        
        // Set company name
        const companyName = 'WaveSync';
        // Set current date and time
        const today = new Date();
        const date = today.toLocaleDateString();
        const time = today.toLocaleTimeString();
        
        // Add company name and date/time to PDF
        doc.text(`${companyName}\nBill Paid on: ${date} at ${time}`, 14, 20);
        
        // Add user information to PDF
        doc.text(`Name: ${getstud.name}`, 14, 40);
        doc.text(`Email: ${getstud.email}`, 14, 50);
        doc.text(`Mobile Number: ${getstud.contact}`, 14, 60);
        
        // Add photo to PDF
        const imgData = '../image/paid.png'; // Provide the path to your image file
        
        // Load the image to get its dimensions
        const img = new Image();
        img.src = imgData;
        const imgWidth = 80; // Adjust image width as needed
        const imgHeight = 80; // Adjust image height as needed
        
        // Get page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Calculate center coordinates for the image
        const centerX = (pageWidth - imgWidth) / 2;
        const centerY = (pageHeight - imgHeight) / 2;
        
        // Add image to the center of the page
        doc.addImage(img, 'PNG', centerX, centerY, imgWidth, imgHeight);
        
        // Save PDF file
        doc.save('user_payment_info.pdf');
    }
    
    

    return (
        <div className='container mt-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <center><h4>User Payment Information</h4>
            <div className='underline'></div></center>
            <ul className="list-group w-50 mt-4">
                <li className="list-group-item active" aria-current="true">Information About</li>
                <li className="list-group-item">Name: {getstud.name}</li>
                <li className="list-group-item">Email: {getstud.email}</li>
                <li className="list-group-item">Mobile Number: {getstud.contact}</li>
            </ul>
            <button className='btn btn-primary mt-5' onClick={generatePDF}>Generate Bill</button>
            <Link className='btn btn-primary mt-5' to="/allpayments">Back</Link>
            <div className="mt-5">
                <img src="../image/7011020.jpg" alt="Photo" style={{ maxWidth: '100%', maxHeight: '400px' }}/>
            </div> 
            
        </div>
    )
}
