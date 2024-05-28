import React, { useState, useEffect } from 'react';
import './CompanyINN.css';

const CompanyINN = ({ inn, setInn }) => {
  const [validationError, setValidationError] = useState('');

  const validateINN = (inputINN) => {
    let errorObject = { code: 0, message: '' };
    let isValid = false;

    if (typeof inputINN === 'number') {
      inputINN = inputINN.toString();
    } else if (typeof inputINN !== 'string') {
      inputINN = '';
    }

    if (!inputINN.length) {
      errorObject.code = 1;
      errorObject.message = 'Обязательное поле';
    } else if (/[^0-9]/.test(inputINN)) {
      errorObject.code = 2;
      errorObject.message = 'ИНН должен содержать только цифры';
    } else if ([10, 12].indexOf(inputINN.length) === -1) {
      errorObject.code = 3;
      errorObject.message = 'ИНН должен состоять из 10 или 12 цифр';
    } else {
      const checkDigit = (id, coefficients) => {
        let sum = 0;
        for (let i = 0; i < coefficients.length; i++) {
          sum += coefficients[i] * id[i];
        }
        return parseInt(sum % 11 % 10, 10);
      };

      switch (inputINN.length) {
        case 10:
          const check10 = checkDigit(inputINN, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (check10 === parseInt(inputINN[9], 10)) {
            isValid = true;
          }
          break;
        case 12:
          const check11 = checkDigit(inputINN, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          const check12 = checkDigit(inputINN, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (check11 === parseInt(inputINN[10], 10) && check12 === parseInt(inputINN[11], 10)) {
            isValid = true;
          }
          break;
        default:
          break;
      }

      if (!isValid) {
        errorObject.code = 4;
        errorObject.message = 'Неверный ИНН';
      }
    }

    setValidationError(errorObject.message);
    return isValid;
  };

  useEffect(() => {
    validateINN(inn);
  }, [inn]);

  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="inn">ИНН компании <span className={validationError ? "required-asterisk error" : "required-asterisk"}>*</span></label>
      <input
        type="text"
        id="inn"
        name="inn"
        className={validationError ? 'input-error' : ''}
        value={inn}
        onChange={(e) => setInn(e.target.value)}
        onBlur={() => validateINN(inn)}
        placeholder="10 или 12 цифр"
      />
      {validationError && <div className="error-message">{validationError}</div>}
    </div>
  );
};

export default CompanyINN;
