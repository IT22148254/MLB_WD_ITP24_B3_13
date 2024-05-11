import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from 'react-autosuggest'; // Import Autosuggest component
import Swal from "sweetalert2";
import bg from "../assets/images/bg_main.jpg";

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('pending');
  const [employeeNames, setEmployeeNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await fetch(`http://localhost:8070/employee/employee`);
        const data = await response.json();
        if (response.ok) {
          const names = data.map(employee => employee.fullName);
          setEmployeeNames(names);
        } else {
          setError("Failed to fetch employee names1");
        }
      } catch (error) {
        console.error("Error fetching employee names:", error);
        setError("Failed to fetch employee names");
      }
    };

    fetchEmployeeNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leave = { startDate, endDate, reason, status, employeeName: selectedEmployee };

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
        setSelectedEmployee('');
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

  // Autosuggest inputProps
  const inputProps = {
    placeholder: 'Employee Name',
    value: selectedEmployee,
    onChange: (event, { newValue }) => setSelectedEmployee(newValue)
  };

  // Autosuggest suggestions
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Clear suggestions when input is cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Function to filter suggestions based on input value
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : employeeNames.filter(name =>
      name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Render suggestion
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  // Function to get suggestion value
  const getSuggestionValue = (suggestion) => suggestion;

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/40 w-1/2 rounded-lg py-12 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Add Leave</p>
        </div>

        <form method="POST" className="add-promo" onSubmit={handleSubmit}>
          <div className="add-promo-row mb-5">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              theme={{
                suggestionsList: {
                  backgroundColor: 'black'
                },
                suggestion: {
                  color: 'white'
                }
              }}
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
          <div className="add-promo-row mb-6">
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
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md ml-7 hover:bg-blue-700'>
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
