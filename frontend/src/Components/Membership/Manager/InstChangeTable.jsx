import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Container } from "reactstrap";
import bg from "../../../Images/package_bg.jpg";

const OnetimeChangeTable = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };
  // Initialize the useNavigate hook
  let navigate = useNavigate();

  const { id } = useParams();

  const [onetimes, setOnetimes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredOnetimes, setFilteredOnetimes] = useState([]);

  useEffect(() => {
    const fetchOnetimes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/schedule/coachSchedule/"
        );
        console.log(response);
        setOnetimes(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchOnetimes();
  }, []);

  useEffect(() => {
    const filtered = filterOnetimes(onetimes, searchInput);
    setFilteredOnetimes(filtered);
  }, [searchInput, onetimes]);

  const handleEdit = (onetime) => {
    navigate(`/chngtimeondytbl/${onetime._id}`, { state: { onetime } });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:8070/schedule/coachSchedule/${id}`
          );

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              // Refresh the page
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the feedback.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting feeddback:", error);
        }
      }
    });
  };

  const handleCreateReport = () => {
    // initialize the PDF document
    const doc = new jsPDF();

    // add title to the PDF document
    doc.setFontSize(16);
    doc.text("Onetime Change Report", 14, 22);

    // define the table columns
    const columns = [
      { header: "Customer Name", dataKey: "Day" },
      { header: "Email", dataKey: "TimeSlot" },
      { header: "Rating", dataKey: "Trainer" },
    ];

    // define the table rows
    const rows = onetimes.map((ont) => ({
      Day: ont.Day,
      TimeSlot: ont.TimeSlot,
      Trainer: ont.Trainer,
    }));

    // add the table to the PDF document
    doc.autoTable(columns, rows);

    // save the PDF file
    doc.save("One time Changes.pdf");
  };

  const filterOnetimes = (onts, searchText) => {
    return onts.filter((ont) =>
      ont.Trainer.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  // Define the function to handle navigation to the add feedback page
  const handleAddSchedule = () => {
    navigate('/changetime')
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-4/5 h-3/4 rounded-[50px] py-12 px-12 gap -inset-y-8">
        {/* <div className="w-full"> */}
          <div
            className="text-4xl text-white font-bold align-top mb-6"
            style={{ WebkitTextStroke: "1px black" }}
          >
            One time Changes
          </div>
          <div className="mb-4">
            <div className="h-9 bg-white/70 w-1/2 rounded-lg">
              <input
                placeholder="Search by Trainer"
                className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 bg-cyan-400">
            <div className="border-2 border-black p-3">Day</div>
            <div className="border-2 border-black p-3">Time Slot</div>
            <div className="border-2 border-black p-3">Trainer</div>
            <div className="border-2 border-black p-3">Edit</div>
            <div className="border-2 border-black p-3">Delete</div>
          </div>
          <div
            className="w-full overflow-auto "
            style={{
              maxHeight: "450px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredOnetimes &&
              filteredOnetimes.map((ont, index) => (
                <div
                  className={`grid grid-cols-5 ${
                    index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                  }`}
                  key={ont._id}
                >
                  <div className="border-2 border-black p-2">
                    {ont.Day}
                  </div>
                  <div className="border-2 border-black p-2">
                    {ont.TimeSlot}
                  </div>
                  <div className="border-2 border-black p-2">
                    {ont.Trainer}
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleEdit(ont)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="border-2 border-black p-2">
                  <button
                      className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleDelete(ont._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {/* Button to generate feedback report */}
          <button
            className="absolute bottom-4 right-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-13"
            onClick={handleCreateReport}
          >
            Generate schedule Report
          </button>

          {/* Button to add feedback */}
          <button
            className="absolute bottom-4 left-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-13"
            onClick={handleAddSchedule}
          >
            Add Schedule
          </button>
        {/* </div> */}
        
      </div>
    </div>
  );
};

export default OnetimeChangeTable;
