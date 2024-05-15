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
                const res = await axios.get(`http://localhost:8070/package/propackage/get/${id}`);
                setPkgs(res.data);
                console.log(res.data);
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
            <li key={pkgs._id}>{pkgs.Name}</li>
                {/* {pkgs.map( (pkg) => (
                    <li key={pkg._id}>{pkg.Name}</li>
                ))} */}
            </ul>
        </div>
    );
}

export default TestScreen;
