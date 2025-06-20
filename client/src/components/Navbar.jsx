import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          🍽️ SmartFoodie
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/explore" className="text-gray-700 hover:text-indigo-600 font-medium">Explore</Link>
          <Link to="/reviews" className="text-gray-700 hover:text-indigo-600 font-medium">Review</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-2 shadow-md">
          <Link to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/explore" className="block text-gray-700 hover:text-indigo-600">Explore</Link>
          <Link to="/reviews" className="block text-gray-700 hover:text-indigo-600">Review</Link>
          <Link to="/about" className="block text-gray-700 hover:text-indigo-600">About</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-indigo-600">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
