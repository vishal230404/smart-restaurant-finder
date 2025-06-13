// components/LocationSelector.jsx

import React from 'react';

const LocationSelector = ({ options, onSelect }) => {
  return (
    <div className="mt-4 text-center">
      <p className="mb-2 text-sm text-gray-600">Or choose a location manually:</p>
      <select
        className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64"
        onChange={(e) => {
          const selected = JSON.parse(e.target.value);
          if (selected.lat && selected.lon) onSelect(selected);
        }}
      >
        <option value="">Select a location</option>
        {options.map((loc, idx) => (
          <option key={idx} value={JSON.stringify({ lat: loc.lat, lon: loc.lon })}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;