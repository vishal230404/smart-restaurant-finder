import React from 'react';
import { MapPin, Star } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const { name, rating, distance } = restaurant;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 transition-transform transform hover:scale-[1.02]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 text-sm rounded-full font-medium">
          <Star size={16} className="mr-1" />
          {typeof rating === 'number' ? rating.toFixed(1) : 'N/A'}
        </div>
      </div>
      <div className="flex items-center text-gray-600 text-sm">
        <MapPin size={16} className="mr-1" />
        {typeof distance === 'number' ? `${distance.toFixed(2)} km away` : 'N/A'}
      </div>
    </div>
  );
};

export default RestaurantCard;
