import React from 'react';

const LocationSelector = ({ options, onSelect }) => {
  return (
    <div className="text-center">
      <p className="mb-2 font-medium">Choose a location manually:</p>
      <select
        onChange={(e) => {
          const selected = options[e.target.value];
          onSelect(selected);
        }}
        className="p-2 border rounded"
        defaultValue=""
      >
        <option value="" disabled>Select location</option>
        {options.map((loc, index) => (
          <option key={index} value={index}>{loc.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
