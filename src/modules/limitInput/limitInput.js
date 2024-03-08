import React from "react";
import "./LimitInput.css";

const LimitInput = ({ limit, onChange }) => {
  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    if (newValue > 10) {
      newValue = 10;
    }

    onChange(newValue);
  };

  return (
    <div>
      <label htmlFor="limitInput">Limit: </label>
      <input
        type="number"
        id="limitInput"
        value={limit}
        onChange={handleChange}
        min="1"
        max="10"
      />
    </div>
  );
};

export default LimitInput;
