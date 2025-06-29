import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ReviewAnalyzer from './pages/ReviewAnalyzer.jsx';
import About from './pages/About';
import CityRestaurants from './pages/CityRestaurants.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:cityName/:countryName" element={<CityRestaurants />} />
          <Route path="/city/:cityName" element={<CityRestaurants />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reviews" element={<ReviewAnalyzer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
