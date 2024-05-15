import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import bg from "../../../Images/bg.jpg";

const ChangeOnetimeEdit = () => {
  const [TimeSlot, setTimeSlot] = useState("");
  const [Day, setDay] = useState("");
  const [Trainer, setTrainer] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchonetimes = async () => {
      try {
        const result =  await axios.get(`http://localhost:8070/schedule/get/${id}`);

        setTimeSlot(result.data.result.TimeSlot);
        setDay(result.data.result.Day);
        setTrainer(result.data.result.Trainer);
      } catch (error) {
        setError(error.response.data.message);
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
      .put(`http://localhost:8070/schedule/coachSchedule/${id}`, {
        TimeSlot: TimeSlot,
      Day: Day,
      Trainer: Trainer,
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
              value={Day}
              onChange={(e) => setDay(e.target.value)}
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
              <option value="8.30-10.30">8.30 AM - 11:30 AM</option>
              <option value="10.30-12.30">10.30 AM - 12.30 PM</option>
              <option value="1.30-3.30">1.30 AM - 3.30 PM</option>
              <option value="3.30-5.30">3.30 AM - 5.30 PM</option>
            </select>
          </div>
          {/* Trainer input */}
          <div className="flex items-center mb-12">
            <label htmlFor="Trainer" className="w-1/4 py-2 mb-0 mr-4 font-medium text-white">
              New Trainer
            </label>
            <select
              name="Trainer"
              id="Trainer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dropdown"
              value={Trainer}
              onChange={(e) => setTrainer(e.target.value)}
            >
              <option value="Senura">Senura</option>
              <option value="Dinitha">Dinitha</option>
              <option value="Pubudu">Pubudu</option>
              <option value="Sahan">Sahan</option>
            </select>
          </div>
          {/* Submit button */}
          <div className="flex justify-end mt-4 add-promo-row">
            <div className="add-promo-btns">
              <button
                type="submit"
                className='px-4 py-2 mr-[72px] text-white bg-blue-500 rounded-md fon2t-semibold secondary__btn hover:bg-blue-700' >
                Submit
              </button>
              <button
                type="reset"
                className='px-4 py-2 mr-0 font-semibold text-white bg-red-600 rounded-md primary__btn hover:bg-red-300' >
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

export default ChangeOnetimeEdit;
