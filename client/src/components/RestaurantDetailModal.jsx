import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  CreditCard, 
  Truck, 
  Calendar,
  Users,
  ChefHat,
  Navigation,
  X,
  ExternalLink,
} from "lucide-react";

const RestaurantDetailModal = ({ restaurant, userLat, userLon, onClose }) => {
  const name = restaurant.restaurant_name || restaurant.Name;
  const rating = restaurant.rate || restaurant.avg_rating || 0;
  const distance = restaurant.distance_km;
  const lat = restaurant.lat;
  const lon = restaurant.lon;

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

  const getPriceRangeText = (range) => {
    switch(range) {
      case 1: return '$ - Budget Friendly';
      case 2: return '$$ - Moderate';
      case 3: return '$$$ - Expensive';
      case 4: return '$$$$ - Very Expensive';
      default: return 'Price not available';
    }
  };

  const getRatingTextColor = (color) => {
    switch(color?.toLowerCase()) {
      case 'green': return 'text-green-600 bg-green-50';
      case 'yellow': return 'text-yellow-600 bg-yellow-50';
      case 'orange': return 'text-orange-600 bg-orange-50';
      case 'red': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
            <div className="flex items-center space-x-4">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getRatingColor(rating)}`}>
                <span className="mr-2">{rating.toFixed(1)}</span>
                <div className="flex items-center space-x-0.5">
                  {renderStars(rating)}
                </div>
              </div>
              {restaurant["Rating text"] && (
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getRatingTextColor(restaurant["Rating color"])}`}>
                  {restaurant["Rating text"]}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Location & Address */}
          <div className="bg-blue-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin size={18} className="mr-2 text-blue-600" />
              Location
            </h3>
            <div className="space-y-2 text-sm">
              {restaurant.Address && (
                <p className="text-gray-700">{restaurant.Address}</p>
              )}
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  {restaurant["Locality Verbose"] || `${restaurant.location}, ${restaurant.City}`}
                </p>
                <span className={`font-medium ${getDistanceColor(distance)}`}>
                  {typeof distance === 'number' ? `${distance.toFixed(1)} km away` : 'Distance unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Cuisine & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ChefHat size={18} className="mr-2 text-orange-600" />
                Cuisine
              </h3>
              <p className="text-gray-700">{restaurant.cuisines || 'Not specified'}</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CreditCard size={18} className="mr-2 text-green-600" />
                Pricing
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-700 font-medium">
                  {getPriceRangeText(restaurant["Price range"])}
                </p>
                {restaurant.cost && (
                  <p className="text-gray-600">
                    Avg. cost: {restaurant.Currency} {restaurant.cost}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-purple-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Clock size={18} className="mr-2 text-purple-600" />
              Services & Features
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Calendar size={14} className="mr-2" />
                  Table Booking
                </span>
                <span className={`font-medium ${restaurant["Has Table booking"] === "Yes" ? "text-green-600" : "text-red-600"}`}>
                  {restaurant["Has Table booking"] === "Yes" ? "Available" : "Not Available"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Truck size={14} className="mr-2" />
                  Online Delivery
                </span>
                <span className={`font-medium ${restaurant["Has Online delivery"] === "Yes" ? "text-green-600" : "text-red-600"}`}>
                  {restaurant["Has Online delivery"] === "Yes" ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurant.phone && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone size={18} className="mr-2 text-gray-600" />
                  Contact
                </h3>
                <p className="text-gray-700">{restaurant.phone}</p>
              </div>
            )}

            <div className="bg-indigo-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Navigation size={18} className="mr-2 text-indigo-600" />
                Navigation
              </h3>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Open in Maps
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          {(restaurant.votes || restaurant.reviews_count) && (
            <div className="bg-yellow-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users size={18} className="mr-2 text-yellow-600" />
                Reviews
              </h3>
              <p className="text-gray-700">
                {restaurant.votes || restaurant.reviews_count} customer reviews
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailModal;
