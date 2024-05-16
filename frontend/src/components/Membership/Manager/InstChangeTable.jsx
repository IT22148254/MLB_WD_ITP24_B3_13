import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Container } from "reactstrap";
import bg from "../../../Images/bg.jpg";

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
    navigate(`/sch/chngtimeondytb/${onetime._id}`, { state: { onetime } });
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
    const doc = new jsPDF();

    const companyName = "WaveSync";
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    doc.text(
      `${companyName} \nEmployee report generated on : ${date} at ${time}`,
      14,
      20
    );

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
    doc.autoTable({startY:50,columns, body:onetimes.map((ont) => [
      ont.Day,
      ont.TimeSlot,
      ont.Trainer,
    ]),});

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
    navigate('/sch/addsch')
  };

  return (
    <div className="flex items-center justify-center h-full" style={bgStyle}>
      <div className="bg-black/40 w-4/5 h-[800px] rounded-[50px] py-12 px-12 gap -inset-y-8">
        {/* <div className="w-full"> */}
          <div className=" text-xl mb-10 bottom-[508px] left-0 right-[450px] text-center text-white font-normal" style={{ fontFamily: 'poppins' }}>
            One Time Changes
          </div>
          <div className="mb-4">
            <div className="w-1/2 rounded-lg h-9 bg-white/70">
              <input
                placeholder="Search by Trainer"
                className="w-full h-full pl-4 bg-transparent border-none placeholder:text-gray-600 active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 bg-cyan-400/85">
            <div className="p-3 text-center border-2 border-black" style={{ fontFamily: 'poppins' }}>Day</div>
            <div className="p-3 text-center border-2 border-black" style={{ fontFamily: 'poppins' }}>Time Slot</div>
            <div className="p-3 text-center border-2 border-black" style={{ fontFamily: 'poppins' }}>Trainer</div>
            <div className="p-3 text-center border-2 border-black" style={{ fontFamily: 'poppins' }}>Edit</div>
            <div className="p-3 text-center border-2 border-black" style={{ fontFamily: 'poppins' }}>Delete</div>
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
                    index % 2 === 0 ? "bg-cyan-100/75 " : "bg-cyan-400/85 "
                  }`}
                  key={ont._id}
                >
                  <div className="p-2 border-2 border-black">
                    {ont.Day}
                  </div>
                  <div className="p-2 border-2 border-black">
                    {ont.TimeSlot}
                  </div>
                  <div className="p-2 border-2 border-black">
                    {ont.Trainer}
                  </div>
                  <div className="p-2 border-2 border-black">
                    <button
                      className='px-4 py-2 mr-[72px] text-white bg-blue-600 rounded-md fon2t-semibold secondary__btn hover:bg-blue-800'
                      onClick={() => handleEdit(ont)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="p-2 border-2 border-black ">
                  <button
                      className='px-4 py-2 mr-0 font-semibold text-white bg-red-600 rounded-md primary__btn hover:bg-red-300' 
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
            className='absolute  mb-10 bottom-[680px] left-[1400px] right-0 px-4 py-2 mr-[72px] text-white bg-blue-500 rounded-md font-semibold secondary__btn hover:bg-blue-700'
            onClick={handleCreateReport}
            style={{ fontFamily: 'poppins' }}>
            Generate schedule Report
          </button>

          {/* Button to add feedback */}
          <button
            className=' py-2 px-10  mr-0 font-semibold text-white bg-red-600 rounded-md mt-px-4 primary__btn hover:bg-red-300 mt-[20px]'
            onClick={handleAddSchedule}
            style={{ fontFamily: 'poppins' }} >
            Add Schedule
          </button>
        {/* </div> */}
        
      </div>
    </div>
  );
};

export default OnetimeChangeTable;
