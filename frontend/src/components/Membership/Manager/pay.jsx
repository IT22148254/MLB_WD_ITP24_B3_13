import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import bg from '../../../Images/package_bg.jpg';
import './styles/editPromos.css';
import { useNavigate } from 'react-router-dom';

const Pay = () => {
    const { id } = useParams(); // Get id from URL
    const [pkg, setPkg] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8070/package/package/get/${id}`);
                setPkg(data.pkg); // Assuming data is directly the package object
            } catch (error) {
                console.error('Error fetching package:', error);
            }
        };
        fetchData();
    }, [id]); // Add id to dependency array

    const handlePay = () => {
        localStorage.setItem('pkg',id)
        //console.log(localStorage.getItem('pkg'))
        navigate('/payment/add')

    };

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        height: '100vh',
    };

    return (
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 h-3/4 w-3/4 rounded-[50px] py-10 px-14 flex flex-col gap-y-8">
                <p className="text-4xl font-bold text-white">Package Details</p>
                {pkg ? (
                    <div className="text-white">
                        <p><strong>Name:</strong> {pkg.Name}</p>
                        <p><strong>Description:</strong> {pkg.Discription}</p>
                        <p><strong>Price:</strong> {pkg.Price}</p>
                        <p><strong>Validity:</strong> {pkg.Duration}</p>
                        <button onClick={handlePay} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600">Pay</button>
                    </div>
                ) : (
                    <p className="text-white">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Pay;

