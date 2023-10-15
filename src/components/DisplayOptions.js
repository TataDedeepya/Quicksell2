import React, { useState } from 'react';

function DisplayOptions({ groupByOption, orderByOption, setGroupByOption, setOrderByOption }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="display-options">
      <div className="display-option" onClick={toggleOptions}>
      <i class="fa-solid fa-sliders"></i>
      <label id="displat-text">  Display</label>
      <i class="fa-solid fa-caret-down"></i>
      </div>

      {showOptions && (
        <div className="options-dropdown">
          <div className="option">
            <label htmlFor="groupBy">Group By:</label>
            <select id="groupBy" value={groupByOption} onChange={(e) => setGroupByOption(e.target.value)}>
              <option value="user">By User</option>
              <option value="status">By Status</option>
              <option value="priority">By Priority</option>
            </select>
          </div>

          <div className="option">
            <label htmlFor="orderBy">Order By:</label>
            <select id="orderBy" value={orderByOption} onChange={(e) => setOrderByOption(e.target.value)}>
              <option value="priority">By Priority</option>
              <option value="title">By Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayOptions;
