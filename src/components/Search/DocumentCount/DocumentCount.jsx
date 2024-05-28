import React, { useState, useEffect } from 'react';
import './DocumentCount.css';

const DocumentCount = ({ documentCount, setDocumentCount }) => {
  const [error, setError] = useState('');

  const validateDocumentCount = () => {
    const count = parseInt(documentCount);

    if (!documentCount) {
      setError("Обязательное поле");
    } else if (isNaN(count) || count < 1) {
      setError("Число документов не может быть меньше одного");
    } else if (count > 1000) {
      setError("Число документов должно быть больше 1000");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    validateDocumentCount();
  }, [documentCount]);

  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="docCount">Количество документов в выдаче <span className={ error ? "required-asterisk error" : "required-asterisk"}>*</span></label>
      <input
        type="number"
        id="docCount"
        name="docCount"
        className={error ? 'input-error' : ''}
        value={documentCount}
        onChange={(e) => { setDocumentCount(e.target.value); }}
        onBlur={validateDocumentCount}
        placeholder="от 1 до 1000"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DocumentCount;
