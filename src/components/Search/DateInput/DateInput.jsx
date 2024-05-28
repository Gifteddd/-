import React, { useState, useEffect } from 'react';
import './DateInput.css';

const DateInput = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [error, setError] = useState('');
  const [startDateInput, setStartDateInput] = useState('text');
  const [endDateInput, setEndDateInput] = useState('text');

  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate]);

  const validateDateRange = () => {
    const currentDate = new Date();
    
    if (!startDate || !endDate) {
      setError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
      setError("Дата начала не может быть позднее даты окончания");
    } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
    }
  };

  return (
    <div className="form-field">
      <label htmlFor="startDate">Диапазон поиска <span className={error ? "required-asterisk error" : "required-asterisk"}>*</span></label>
      <div className='form-field-date-inputs'>
        <div className="date-input-container">
          <input
            type={startDateInput}
            onFocus={() => setStartDateInput('date')}
            onBlur={() => {
              validateDateRange();
              if (!startDate) setStartDateInput('text');
            }}
            id="startDate"
            name="startDate"
            placeholder="Дата начала"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={error ? 'error' : ''}
          />
          <input
            type={endDateInput}
            onFocus={() => setEndDateInput('date')}
            onBlur={() => {
              validateDateRange();
              if (!endDate) setEndDateInput('text');
            }}
            id="endDate"
            name="endDate"
            placeholder="Дата конца"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={error ? 'error' : ''}
          />
        </div>
        {error && <div className="date-error-message error">{error}</div>}
      </div>  
    </div>
  );
};

export default DateInput;