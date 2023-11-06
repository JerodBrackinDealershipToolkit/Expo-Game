import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const NumberInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleIncrement = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      const newValue = Number(inputRef.current.value) + 1;
      onChange(newValue);
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      const newValue = Math.max(Number(inputRef.current.value) - 1, 0);
      onChange(newValue);
    }
  };

  const onInputChange = (e) => {
    const inputValue = e.target.value;
  
    // Only update if the value is a number and not less than 0
    if (!isNaN(inputValue) && inputValue !== '' && Number(inputValue) >= 0) {
      onChange(Number(inputValue));
    }
  };
  
  return (
    <div className="NumberInput" style={{fontSize: "1rem", margin: "auto", }}>
      <input ref={inputRef} value={value} onChange={onInputChange} />
      <div className="Control">
        <FontAwesomeIcon icon={faCaretUp} onClick={handleIncrement} />
        <FontAwesomeIcon icon={faCaretDown} onClick={handleDecrement} />
      </div>
    </div>
  );
}

export default NumberInput;
