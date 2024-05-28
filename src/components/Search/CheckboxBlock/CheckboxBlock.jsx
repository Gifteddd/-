import React from 'react';
import './CheckboxBlock.css';

const CheckboxBlock = ({ checkboxStates, handleCheckboxChange }) => {
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  const Checkbox = ({ id, name, checked, label, onChange }) => {
    return (
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="hidden-checkbox"
        />
        <label htmlFor={id} className={checked ? "checked-label" : ""}>
          <span className="custom-checkbox"></span>
          <span className="label-text">{label}</span>
        </label>
      </div>
    );
  };

  return (
    <div className="right-part-search-checkbox-block">
      {Object.entries(checkboxStates).map(([key, checked]) => (
        <Checkbox 
          key={key} 
          id={`checkbox-${key}`} 
          name={key} 
          checked={checked} 
          label={labels[key]} 
          onChange={handleCheckboxChange} 
        />
      ))}
    </div>
  );
};

export default CheckboxBlock;
