import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// "proxy": "http://localhost:8070",

const TestScreen = () => {
    const [sups, setSups] = useState([]);

    useEffect(() => {
        const fetchPkgs = async () => {
            try {
                const {data} = await axios.get('http://localhost:8070/supplier');
                setSups(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        }
        fetchPkgs();
    }, []);

    return (
        <div>
            <h2>TestScreen</h2>
            <ul>
            <li key={sups._id}>{sups.Name}</li>
                {/* {pkgs.map( (pkg) => (
                    <li key={pkg._id}>{pkg.Name}</li>
                ))} */}
            </ul>
        </div>
    );
}

export default TestScreen;