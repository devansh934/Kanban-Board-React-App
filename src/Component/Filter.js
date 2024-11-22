import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onGroupingChange, onSortingChange, onDisplayClick }) => {
  const [selectedGrouping, setSelectedGrouping] = useState('Grouping');
  const [selectedSorting, setSelectedSorting] = useState('Sorting');

  const handleGroupingItemClick = (option) => {
    setSelectedGrouping(option);
    onGroupingChange(option);
  };

  const handleSortingItemClick = (option) => {
    setSelectedSorting(option);
    onSortingChange(option);
  };

  return (
    <div className="filter-container">
      <button className="display-button" onClick={onDisplayClick}>
        Display
      </button>

      <div className="dropdown">
        <button className="dropdown-toggle">{selectedGrouping}</button>
        <div className="dropdown-menu">
          <button onClick={() => handleGroupingItemClick('user')}>User</button>
          <button onClick={() => handleGroupingItemClick('status')}>Status</button>
          <button onClick={() => handleGroupingItemClick('priority')}>Priority</button>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropdown-toggle">{selectedSorting}</button>
        <div className="dropdown-menu">
          <button onClick={() => handleSortingItemClick('priority')}>Priority</button>
          <button onClick={() => handleSortingItemClick('title')}>Title</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;



