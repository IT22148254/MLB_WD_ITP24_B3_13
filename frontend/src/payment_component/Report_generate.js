import React, { useState } from 'react'

export default function Report_generate() {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // perform validation and set error message if necessary
    if (value.length < 5) {
      setValidationError('Input must be at least 5 characters long');
    } else {
      setValidationError('');
    }
  }

  return (
    <div>
      <label>Input:</label>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
    </div>
  )
}
