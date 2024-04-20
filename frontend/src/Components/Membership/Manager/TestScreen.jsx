import React, { useState, useEffect } from "react";
import axios from "axios";

// "proxy": "http://localhost:8070",

const TestScreen = () => {
    const [pkgs, setPkgs] = useState([]);

    useEffect(() => {
        const fetchPkgs = async () => {
            try {
                const { data } = await axios.get('http://localhost:8070/package/package');
                setPkgs(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchPkgs();
    }, []);

    return (
        <div>
            <h2>TestScreen</h2>
            <ul>
                {pkgs.map( (pkg) => (
                    <li key={pkg._id}>{pkg.Name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TestScreen;
