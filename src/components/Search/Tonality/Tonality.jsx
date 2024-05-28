import React from 'react';
import './Tonality.css'


const Tonality = ({ tonality, setTonality }) => {
  const handleTonalityChange = (event) => {
    setTonality(event.target.value);
  };

    return (
      <div className="form-field form-field-inputs">
        <label htmlFor="tonality">Тональность</label>
        <div className="select-wrapper"> 
          <select id="tonality" name="tonality" value={tonality} onChange={handleTonalityChange}>
            <option value="Любая">Любая</option>
            <option value="Позитивная">Позитивная</option>
            <option value="Негативная">Негативная</option>
          </select>
        </div>
      </div>
    );
};

export default Tonality;