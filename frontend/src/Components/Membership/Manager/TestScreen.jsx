import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// "proxy": "http://localhost:8070",

const TestScreen = () => {
    const [pkgs, setPkgs] = useState([]);
     const {id} = useParams();

    useEffect(() => {
        const fetchPkgs = async () => {
            try {
                const res = await axios.get('http://localhost:8070/user/');
                setPkgs(res.data);
                console.log(res);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchPkgs();
    }, [id]);

    return (
        <div>
            <h2>TestScreen</h2>
            <ul>
            {/* <li key={pkgs._id}>{pkgs.title}</li> */}
                {pkgs.map( (pkg) => (
                    <li key={pkg._id}>{pkg.Fname}</li>
                ))}
            </ul>
        </div>
    );
}

export default TestScreen;
