import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from '../../../Images/package_bg.jpg';

const ShowPackages = () => {
    const [standardPackages, setStandardPackages] = useState([]);
    const [promoPackages, setPromoPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const standardResponse = await axios.get('http://localhost:8070/package/package');
                const promoResponse = await axios.get('http://localhost:8070/package/propackage');
                setStandardPackages(standardResponse.data);
                setPromoPackages(promoResponse.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, []);

    const handleSelect = (id, type) => {
        if (type === 'standard') {
            navigate(`/pkg/pay/${id}`);
        } else if (type === 'promo') {
            navigate(`/pkg/pay2/${id}`);
        }
    };

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const packageCardStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        color: 'white',
        borderRadius: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        padding: '16px',
        width: '300px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
    };

    const handleHover = (e) => {
        e.target.style.transform = 'scale(1.1)';
        // e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Change background color on hover
        e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.4)'; // Change box shadow on hover
    };
    

    const handleHoverOut = (e) => {
        e.target.style.transform = 'scale(1)';
        // e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Change background color on hover
        e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.0)'; // Change box shadow on hover
    };

    return (
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 h-auto w-auto rounded-[50px] py-10 px-14 flex flex-col gap-y-8">
                <p className="text-4xl font-bold text-white">Packages</p>
                <div className="mb-8">
                    <p className="text-2xl text-white mb-4">Standard Packages</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {standardPackages.map((pkg) => (
                            <div
                                key={pkg._id}
                                style={packageCardStyle}
                                onMouseOver={handleHover}
                                onMouseOut={handleHoverOut}
                                onClick={() => handleSelect(pkg._id, 'standard')}
                            >
                                <h3 className="text-xl font-bold mb-2">{pkg.Name}</h3>
                                <p className="mb-4">{pkg.Discription}</p>
                                <p className="mb-2">Price: {pkg.Price}</p>
                                <p className="mb-4">Valid Until: {pkg.Duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-2xl text-white mb-4">Promo Packages</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {promoPackages.map((promo) => (
                            <div
                                key={promo._id}
                                style={packageCardStyle}
                                onMouseOver={handleHover}
                                onMouseOut={handleHoverOut}
                                onClick={() => handleSelect(promo._id, 'promo')}
                            >
                                <h3 className="text-xl font-bold mb-2">{promo.Name}</h3>
                                <p className="mb-4">{promo.Discription}</p>
                                <p className="mb-2">Price: {promo.Price}</p>
                                <p className="mb-4">Valid Until: {promo.Duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowPackages;
