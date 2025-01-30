import React from 'react';

const SortByAge = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    const value = e.target.value;
    onSortChange(value); // Pass the selected sort order to the parent
  };

  return (
    <div>
      <label htmlFor="ageSort">Sort By Age:</label>
      <select id="ageSort" onChange={handleSortChange}>
        <option value="asc">Youngest to Oldest</option>
        <option value="desc">Oldest to Youngest</option>
      </select>
    </div>
  );
};

export default SortByAge;