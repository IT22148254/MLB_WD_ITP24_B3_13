import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNameError, setEmployeeNameError] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);
  const [error, setError] = useState("");

  const [basicSalary, setBasicSalary] = useState("");
  const [basicSalaryError, setBasicSalaryError] = useState("");

  const [hourlyRate, setHourlyRate] = useState("");
  const [hourlyRateError, setHourlyRateError] = useState("");

  const [otHours, setOtHours] = useState("");
  const [otHoursError, setOtHoursError] = useState("");

  const [monthlyBonus, setMonthlyBonus] = useState("");
  const [monthlyBonusError, setMonthlyBonusError] = useState("");

  // epf
  const [epf, setEpf] = useState(0);
  // etf
  const [etf, setEtf] = useState(0);
  // ot salary
  const [otSalary, setOtSalary] = useState(0);
  // total salary
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await fetch(`http://localhost:8070/employee/employee`);
        const data = await response.json();

        if (response.ok) {
          const names = data.map((employee) => employee.fullName);
          setEmployeeNames(names);
        } else {
          setError("Failed to fetch employee names");
        }
      } catch (error) {
        console.error("Error fetching employee names:", error);
        setError("Failed to fetch employee names");
      }
    };

    fetchEmployeeNames();
  }, []);

  const handleEmployeeNameChange = (e) => {
    setEmployeeName(e.target.value);
    setEmployeeNameError("");
  };

  const handleBasicSalaryChange = (e) => {
    setBasicSalary(e.target.value);
    setBasicSalaryError("");
  };

  const handleHourlyRateChange = (e) => {
    setHourlyRate(e.target.value);
    setHourlyRateError("");
  };

  const handleOtHoursChange = (e) => {
    setOtHours(e.target.value);
    if (parseInt(e.target.value) > 12) {
      setOtHoursError("OT Hours must be less than 24 hours");
      return;
    }
    setOtHoursError("");
  };

  const handleMonthlyBonusChange = (e) => {
    setMonthlyBonus(e.target.value);
    setMonthlyBonusError("");
  };

  const handleCalculate = () => {
    if (
      employeeName === "" ||
      basicSalary === "" ||
      hourlyRate === "" ||
      otHours === "" ||
      monthlyBonus === ""
    ) {
      if (employeeName === "") {
        setEmployeeNameError("Employee Name is required");
      }
      if (basicSalary === "") {
        setBasicSalaryError("Basic Salary is required");
      }
      if (hourlyRate === "") {
        setHourlyRateError("Hourly Rate is required");
      }
      if (otHours === "") {
        setOtHoursError("OT Hours is required");
      }
      if (monthlyBonus === "") {
        setMonthlyBonusError("Monthly Bonus is required");
      }
    } else {
      const basicSalaryNum = parseFloat(basicSalary);
      const hourlyRateNum = parseFloat(hourlyRate);
      const otHoursNum = parseFloat(otHours);
      const monthlyBonusNum = parseFloat(monthlyBonus);

      const epfNum = basicSalaryNum * 0.12;
      const etfNum = basicSalaryNum * 0.03;
      const otSalaryNum = hourlyRateNum * otHoursNum;
      const totalSalaryNum =
        basicSalaryNum + otSalaryNum + monthlyBonusNum - epfNum - etfNum;

      setEpf(epfNum);
      setEtf(etfNum);
      setOtSalary(otSalaryNum);
      setTotalSalary(totalSalaryNum);
    }
  };

  const inputContainerStyle = "bg-white/70 rounded-xl";
  const inputStyle =
    "w-full bg-transparent h-12 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl";

  return (
    <div
      className="flex flex-col gap-y-4 overflow-auto max-h-[700px] p-5"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-row gap-x-2">
        {/* left */}
        <div className="flex flex-col gap-y-3 w-1/2">
          {/* employee name */}
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <select
                className={
                  inputStyle +
                  (employeeNameError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                value={employeeName}
                onChange={handleEmployeeNameChange}
              >
                <option value="">Select Employee</option>
                {employeeNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {employeeNameError && (
              <p className="text-red-800 font-bold text-lg">
                {employeeNameError}
              </p>
            )}
          </div>
          {/* basic salary */}
          <div className="flex flex-col gap-y-1">
            <div className="bg-white/70 rounded-xl">
              <input
                className={
                  inputStyle +
                  (basicSalaryError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                placeholder="Basic Salary *"
                value={basicSalary}
                onChange={handleBasicSalaryChange}
              />
            </div>
            {basicSalaryError && (
              <p className="text-red-800 font-bold text-lg">
                {basicSalaryError}
              </p>
            )}
          </div>
          {/* OT hours */}
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <input
                className={
                  inputStyle +
                  (otHoursError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                placeholder="OT Hours (h) *"
                value={otHours}
                onChange={handleOtHoursChange}
              />
            </div>
            {otHoursError && (
              <p className="text-red-800 font-bold text-lg">{otHoursError}</p>
            )}
          </div>
          {/* hourly rate */}
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <input
                className={
                  inputStyle +
                  (hourlyRateError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                  }
                  placeholder="OT Hourly Rate (Rs.) *"
                  value={hourlyRate}
                  onChange={handleHourlyRateChange}
                />
              </div>
              {hourlyRateError && (
                <p className="text-red-800 font-bold text-lg">
                  {hourlyRateError}
                </p>
              )}
            </div>
            {/* monthly bonus */}
            <div className="flex flex-col gap-y-1">
              <div className={inputContainerStyle}>
                <input
                  className={
                    inputStyle +
                    (monthlyBonusError &&
                      " outline outline-4 outline-red-800 outline-offset-1")
                  }
                  placeholder="Monthly Bonus (Rs.) *"
                  value={monthlyBonus}
                  onChange={handleMonthlyBonusChange}
                />
              </div>
              {monthlyBonusError && (
                <p className="text-red-800 font-bold text-lg">
                  {monthlyBonusError}
                </p>
              )}
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col w-1/2 justify-center gap-y-3">
            {/* etf */}
            <div className="flex flex-col gap-y-1 items-center">
              <div className="flex flex-row items-center justify-between w-3/4">
                <p className="text-3xl font-bold text-white">ETF:</p>
                <p className="text-2xl text-white">Rs.{etf}</p>
              </div>
            </div>
            {/* epf */}
            <div className="flex flex-col gap-y-1 items-center">
              <div className="flex flex-row items-center justify-between w-3/4">
                <p className="text-3xl font-bold text-white">EPF:</p>
                <p className="text-2xl text-white">Rs.{epf}</p>
              </div>
            </div>
            {/* ot salary */}
            <div className="flex flex-col gap-y-1 items-center">
              <div className="flex flex-row items-center justify-between w-3/4">
                <p className="text-3xl font-bold text-white">OT Salary:</p>
                <p className="text-2xl text-white">Rs.{otSalary}</p>
              </div>
            </div>
            {/* total salary */}
            <div className="flex flex-col gap-y-1 items-center">
              <div className="flex flex-row items-center justify-between w-3/4">
                <p className="text-3xl font-bold text-white">Total Salary:</p>
                <p className="text-2xl text-white">Rs.{totalSalary}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="flex justify-between mt-5">
          <button
            className="bg-cyan-400 py-3 px-10 rounded-lg text-lg font-bold"
            onClick={handleCalculate}
          >
            Calculate
          </button>
          <button className="bg-red-500 py-3 px-10 rounded-lg text-lg font-bold">
            Back
          </button>
        </div>
      </div>
    );
  };
  
  export default Calculator;