import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import bg from "../assets/images/bg_main.jpg";

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('pending');
  const [employeeName, setEmployeeName] = useState(''); // New state for employeeName
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leave = { startDate, endDate, reason, status, employeeName }; // Include employeeName in the leave object

    const response = await fetch('http://localhost:8070/employee/service/add', {
      method: 'POST',
      body: JSON.stringify(leave),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log('error', error);
    }

    if (response.ok) {
      Swal.fire({
        title: "Success",
        text: "Leave added successfully",
        icon: "success",
      }).then(() => {
        console.log('new Leave added', json);
        setStartDate(new Date());
        setEndDate(null);
        setReason('');
        setStatus('pending');
        setEmployeeName(''); // Reset employeeName after successful submission
        setError(null);
        navigate("/showleave");
      });
    }
  };

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/40 w-1/2 rounded-lg py-12 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Add Leave</p>
        </div>

        <form method="POST" className="add-promo" onSubmit={handleSubmit}>
          <div className="add-promo-row">
            <input
              type="text"
              placeholder="Employee Name"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 w-full mb-5"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          <div className="add-promo-row">
            <DatePicker
              showIcon
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 w-full mb-5"
              placeholderText="Date-From"
              selectsStart
              endDate={endDate}
              minDate={new Date()}
              required
            />
          </div>
          <div className="add-promo-row">
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 w-full mb-6"
              placeholderText="Date-To:"
              required
            />
          </div>
          <div className="add-promo-row">
            <textarea
              cols="30"
              rows="5"
              placeholder="Enter the reason here.."
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="add-promo-row flex justify-end gap-2">
            <button type='reset' className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300'>
              Cancel
            </button>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
              Apply
            </button>
          </div>
          {error && <div className="text-red-500 font-bold">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
