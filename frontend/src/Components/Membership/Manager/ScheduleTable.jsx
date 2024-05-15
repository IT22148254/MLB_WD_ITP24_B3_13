import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Container } from "reactstrap";
import bg from "../../../Images/bg.jpg";

const ScheduleTable = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };

  let navigate = useNavigate();
  const { id } = useParams();

  const [Schedules, setSchedules] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/schedule/customerSchedule/"
        );
        console.log(response);
        setSchedules(response.data);
        setFilteredSchedules(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const filtered = filterSchedules(Schedules, searchInput);
    setFilteredSchedules(filtered);
  }, [searchInput, Schedules]);

  const filterSchedules = (schedules, searchText) => {
    return schedules.filter((sch) =>
      sch.Section.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const handleEdit = (schedule) => {
    navigate(`/sch/editsch/${schedule._id}`, { state: { schedule } });
  };

  const handleDelete = (schedule) => {
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
            `http://localhost:8070/schedule/customerSchedule/${schedule._id}`
          );

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
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
          console.error("Error deleting feedback:", error);
        }
      }
    });
  };

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Schedule Report", 14, 22);

    const columns = [
      { header: "Date", dataKey: "Date" },
      { header: "Time Slot", dataKey: "TimeSlot" },
      { header: "Trainer", dataKey: "Trainer" },
    ];

    const rows = filteredSchedules.map((sch) => ({
      Date: sch.Date,
      TimeSlot: sch.TimeSlot,
      Trainer: sch.Section,
    }));

    doc.autoTable(columns, rows);
    doc.save("Schedules.pdf");
  };

  const handleAddSchedule = () => {
    navigate("/sch/addsch/");
  };

  return (
    <div className="flex items-center justify-center h-full" style={bgStyle}>
      <div className="bg-black/40 w-4/5 h-[800px] rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div
          className=" text-xl mb-10 bottom-[508px] left-0 right-[450px] text-center text-white font-normal" style={{ fontFamily: 'poppins' }}
          
        >
          Schedules
        </div>
        <div className="mb-4">
          <div className="w-1/2 rounded-lg h-9 bg-white/70">
            <input
              placeholder="Search by Section"
              className="w-full h-full pl-4 bg-transparent border-none placeholder:text-gray-600 active:border-none focus:border-none focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 bg-cyan-400/85">
          <div className="p-3 border-2 border-black"  style={{ fontFamily: 'poppins' }}>Date</div>
          <div className="p-3 border-2 border-black"  style={{ fontFamily: 'poppins' }}>Time Slot</div>
          <div className="p-3 border-2 border-black"  style={{ fontFamily: 'poppins' }}>Section</div>
          <div className="p-3 border-2 border-black"  style={{ fontFamily: 'poppins' }}>Edit</div>
          <div className="p-3 border-2 border-black"  style={{ fontFamily: 'poppins' }}>Delete</div>
        </div>
        <div
          className="w-full overflow-auto "
          style={{
            maxHeight: "450px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredSchedules &&
            filteredSchedules.map((sch, index) => (
              <div
                className={`grid grid-cols-5 ${
                  index % 2 === 0 ? "bg-cyan-100/75 " : "bg-cyan-400/85 "
                }`}
                key={sch._id}
              >
                <div className="p-2 border-2 border-black">{sch.Date}</div>
                <div className="p-2 border-2 border-black">{sch.TimeSlot}</div>
                <div className="p-2 border-2 border-black">{sch.Section}</div>
                <div className="p-2 border-2 border-black">
                  <button
                    className='px-4 py-2 mr-[72px] text-white bg-blue-600 rounded-md fon2t-semibold secondary__btn hover:bg-blue-800'
                    onClick={() => handleEdit(sch)}
                  >
                    Edit
                  </button>
                </div>
                <div className="p-2 border-2 border-black">
                  <button
                    className='px-4 py-2 mr-0 font-semibold text-white bg-red-600 rounded-md primary__btn hover:bg-red-300' 
                    onClick={() => handleDelete(sch)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          className='absolute  mb-10 bottom-[680px] left-[1400px] right-0 px-4 py-2 mr-[72px] text-white bg-blue-500 rounded-md font-semibold secondary__btn hover:bg-blue-700'
          onClick={handleCreateReport}
        >
          Generate Schedule Report
        </button>
        <button
          className=' py-2 px-10  mr-0 font-semibold text-white bg-red-600 rounded-md mt-px-4 primary__btn hover:bg-red-300 mt-[20px]'
          onClick={handleAddSchedule}
        >
          Add Schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleTable;
