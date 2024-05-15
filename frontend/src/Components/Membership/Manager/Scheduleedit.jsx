import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import bg from "../../../Images/bg.jpg";

const ScheduleEdit = () => {
  const [TimeSlot, setTimeSlot] = useState("");
  const [Date, setDate] = useState("");
  const [Section, setSection] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchonetimes = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8070/schedule/customerSchedule/get/${id}`
        );

        console.log(result);

        setTimeSlot(result.data.TimeSlot);
        setDate(result.data.Date);
        setSection(result.data.Section);

        console.log(result);
      } catch (error) {
        setError(error);
        console.log("Error fetching schedule: ", error);
      }
    };
    fetchonetimes();
  }, [id]);

  const handleSubmit = () => {
    navigate('/sch/schedules/')

    // const scheduleDate = {

    // };

    axios
      .put(`http://localhost:8070/schedule/customerSchedule/${id}`, {
        TimeSlot: TimeSlot,
        Date: Date,
        Section: Section,
      })
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: " schedule updated successfully",
          icon: "success",
        }).then(() => {
          console.log("schedule updated successfully", response.data);
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: " schedule update error",
          icon: "error",
        }).then(() => {
          console.log("Cannot update schedule", error);
        });
      });
  };

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };

  return (
    <div className="flex items-center justify-center h-full" style={bgStyle}>
      <div className="bg-black/55  rounded-[50px] w-[700px] py-16 px-16 gap -inset-y-8">
        <div className="flex items-center justify-center text-xl font-normal text-white mb-14 title" style={{ fontFamily: 'poppins' }}>
          Instructor Change
        </div>
        <form method="POST" className="add-promo" onSubmit={handleSubmit}>
          {/* Date input */}
          <div className="flex items-center mb-12">
            <label htmlFor="Date" className="w-1/4 py-2 mb-0 mr-4 font-medium text-white">
              Date
            </label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={Date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md promoInput"
              required
            />
          </div>
          {/* Time Slot input */}
          <div className="flex items-center mb-12">
            <label
              htmlFor="TimeSlot"
              className="w-1/4 py-2 mb-0 mr-4 font-medium text-white"
            >
              Time Slot
            </label>
            <select
              name="TimeSlot"
              id="TimeSlot"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dropdown"
              value={TimeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="8.30-10.30">8.30 PM - 11:30 AM</option>
              <option value="10.30-12.30">10.30 AM - 12.30 PM</option>
              <option value="1.30-3.30">1.30 AM - 3.30 PM</option>
              <option value="3.30-5.30">3.30 AM - 5.30 PM</option>
            </select>
          </div>
          {/* Section input */}
          <div className="flex items-center mb-12">
            <label
              htmlFor="Section"
              className="w-1/4 py-2 mb-0 mr-4 font-medium text-white"
            >
              New Section
            </label>
            <select
              name="Section"
              id="Section"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dropdown"
              value={Section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="Weekday">Weekday</option>
              <option value="Weekend">Weekend</option>
            </select>
          </div>
          {/* Submit button */}
          <div className="flex justify-end mt-4 add-promo-row">
            <div className="add-promo-btns">
              <button
                type="submit"
                className='px-4 py-2 mr-[72px] text-white bg-blue-500 rounded-md fon2t-semibold secondary__btn hover:bg-blue-700'
              >
                Submit
              </button>
              <button
                type="reset"
                className='px-4 py-2 mr-0 font-semibold text-white bg-red-600 rounded-md primary__btn hover:bg-red-300'
              >
                Cancel
              </button>
            </div>
          </div>
          {/* Error message */}
          {error && <div className="mt-2 text-red-500 error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ScheduleEdit;
