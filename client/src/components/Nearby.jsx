import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 fixed top-0 w-full z-50 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Zomato AI</div>
      <div className="space-x-4 text-gray-800">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/reviews">Reviews</Link> {/* 👈 This is the important one */}
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
