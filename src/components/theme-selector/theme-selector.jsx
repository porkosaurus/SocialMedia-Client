import React, { useState } from 'react';
import './theme-selector.scss'

function ThemeDropdown({ formData, updateFormData, options }) {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleOptionClick = (selectedTheme) => {
    updateFormData({ theme: selectedTheme });
  };

  const capitalizedTheme = formData.theme.charAt(0).toUpperCase() + formData.theme.slice(1);


  return (
    <div className={`select-box`}>
      <label className='form-label' htmlFor="themeSelector">Select Theme:</label>
      <div id="select-button" className="brd" onClick={() => setIsEmpty(!isEmpty)}>
        <div id="selected-value" className="first-option-container">
          <span className='theme-name'>{capitalizedTheme}</span>
          <div className="chevrons">
            <i className="fas fa-chevron-up"></i>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className={`options  ${isEmpty ? 'empty' : ''}`}>
        {options.map((option, index) => (
          <div className={`option`} onClick={() => handleOptionClick(option.value)} key={index} data-value={option.value}>
            <i className={`fas ${option.icon}`}></i>
            <span className="label">{option.label}</span>
            <span className="opt-val">{option.label}</span>
          </div>
        ))}
        <div id="option-bg"></div>
      </div>
    </div>
  );
}

export default ThemeDropdown;

