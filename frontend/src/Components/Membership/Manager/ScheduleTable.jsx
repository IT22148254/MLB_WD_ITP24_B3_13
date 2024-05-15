import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Container } from "reactstrap";
import bg from "../../../Images/package_bg.jpg";

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
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-4/5 h-3/4 rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div
          className="text-4xl text-white font-bold align-top mb-6"
          style={{ WebkitTextStroke: "1px black" }}
        >
          Schedules
        </div>
        <div className="mb-4">
          <div className="h-9 bg-white/70 w-1/2 rounded-lg">
            <input
              placeholder="Search by Section"
              className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 bg-cyan-400">
          <div className="border-2 border-black p-3">Date</div>
          <div className="border-2 border-black p-3">Time Slot</div>
          <div className="border-2 border-black p-3">Section</div>
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
          {filteredSchedules &&
            filteredSchedules.map((sch, index) => (
              <div
                className={`grid grid-cols-5 ${
                  index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                }`}
                key={sch._id}
              >
                <div className="border-2 border-black p-2">{sch.Date}</div>
                <div className="border-2 border-black p-2">{sch.TimeSlot}</div>
                <div className="border-2 border-black p-2">{sch.Section}</div>
                <div className="border-2 border-black p-2">
                  <button
                    className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white fsch-bold"
                    onClick={() => handleEdit(sch)}
                  >
                    Edit
                  </button>
                </div>
                <div className="border-2 border-black p-2">
                  <button
                    className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white fsch-bold"
                    onClick={() => handleDelete(sch)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          className="absolute bottom-4 right-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-13"
          onClick={handleCreateReport}
        >
          Generate Schedule Report
        </button>
        <button
          className="absolute bottom-4 left-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-13"
          onClick={handleAddSchedule}
        >
          Add Schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleTable;
