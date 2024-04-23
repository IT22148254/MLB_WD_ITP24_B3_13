import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// "proxy": "http://localhost:8070",

const TestScreen = () => {
    const [sups, setSups] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchPkgs = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/supplier/get/${id}`);
                setSups(res.data.supplier);
                console.log(res);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        }
        fetchPkgs();
    }, [id]);

    return (
        <div>
            <h2>TestScreen</h2>
            <ul>
            <li key={sups._id}>{sups.Name}</li> 
                {/* {sups && sups.map( (sup) => (
                    <li key={sup._id}>{sup.Name}</li>
                ))} */}
            </ul>
        </div>
    );
}

export default TestScreen;