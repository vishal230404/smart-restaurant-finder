import { Star, MapPin, Navigation, Info, ChefHat } from "lucide-react";

const RestaurantCard = ({ restaurant, userLat, userLon, onViewDetails }) => {
  const name = restaurant.restaurant_name || restaurant.Name;
  const rating = restaurant.rate || restaurant.avg_rating || 0;
  const distance = restaurant.distance_km;
  const lat = restaurant.lat;
  const lon = restaurant.lon;
  const cuisines = restaurant.cuisines || restaurant.Cuisines;
  const city = restaurant.City || restaurant.city;

  const mapUrl = userLat && userLon
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${lat},${lon}`
    : `https://www.google.com/maps?q=${lat},${lon}`;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      const isFilled = i < fullStars;
      const isHalf = i === fullStars && hasHalfStar;
      
      stars.push(
        <div key={i} className="relative">
          <Star
            size={16}
            className={`${
              isFilled
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 fill-gray-100'
            } transition-colors duration-200`}
          />
          {isHalf && (
            <Star
              size={16}
              className="absolute top-0 left-0 text-amber-400 fill-amber-400 transition-colors duration-200"
              style={{
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
              }}
            />
          )}
        </div>
      );
    }
    return stars;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-emerald-600 bg-emerald-50';
    if (rating >= 4.0) return 'text-green-600 bg-green-50';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-50';
    if (rating >= 3.0) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getDistanceColor = (distance) => {
    if (typeof distance !== 'number') return 'text-gray-500';
    if (distance <= 1) return 'text-emerald-600';
    if (distance <= 3) return 'text-blue-600';
    if (distance <= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  // Function to format cuisines text
  const formatCuisines = (cuisines) => {
    if (!cuisines) return null;
    
    if (typeof cuisines === 'string') {
      const cuisineArray = cuisines.split(',').map(c => c.trim());
      return cuisineArray.slice(0, 2).join(', ') + (cuisineArray.length > 2 ? '...' : '');
    }
    
    if (Array.isArray(cuisines)) {
      return cuisines.slice(0, 2).join(', ') + (cuisines.length > 2 ? '...' : '');
    }
    
    return null;
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-lg shadow-lg hover:shadow-2xl rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02] border border-white/20 overflow-hidden h-full">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex-1 mb-4">
          <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-gray-800 transition-colors duration-200 line-clamp-2">
            {name}
          </h2>
          
          {/* Cuisines Section */}
          {cuisines && (
            <div className="flex items-center mb-2">
              <ChefHat size={14} className="text-orange-500 mr-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200 line-clamp-1">
                {formatCuisines(cuisines)}
              </p>
            </div>
          )}

          {/* City Section */}
          {city && (
            <div className="flex items-center mb-3">
              <MapPin size={14} className="text-blue-500 mr-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200 line-clamp-1">
                {city}
              </p>
            </div>
          )}
          
          {/* Rating and Distance Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Rating Badge */}
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getRatingColor(rating)} transition-all duration-200`}>
              <span className="mr-1">{rating.toFixed(1)}</span>
              <div className="flex items-center space-x-0.5">
                {renderStars(rating)}
              </div>
            </div>
            
            {/* Distance */}
            <div className="flex items-center bg-gray-50 rounded-full px-2.5 py-1 group-hover:bg-gray-100 transition-colors duration-200">
              <MapPin 
                size={14} 
                className={`mr-1 ${getDistanceColor(distance)} transition-colors duration-200`}
              />
              <span className={`text-xs font-medium ${getDistanceColor(distance)} transition-colors duration-200`}>
                {typeof distance === 'number' ? `${distance.toFixed(1)} km` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          <button
            onClick={() => onViewDetails(restaurant)}
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm mb-2"
          >
            <Info size={16} className="mr-2" />
            View Details
          </button>
          
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
          >
            <Navigation size={16} className="mr-2" />
            Get Directions
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute bottom-3 left-3 w-6 h-6 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
    </div>
  );
};

export default RestaurantCard;
