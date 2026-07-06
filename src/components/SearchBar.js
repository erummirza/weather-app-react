
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, onLocationSearch, isLoading }) => {
  const [city, setCity] = useState('New York');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-wrapper">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city, e.g. London"
          disabled={isLoading}
        />
        <button type="submit" className="search-btn" disabled={isLoading}>
          <FontAwesomeIcon icon={faArrowRight} /> Search
        </button>
      </form>
      <div className="search-actions">
        <button 
          onClick={onLocationSearch} 
          className="location-btn"
          title="Use my location"
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faLocationDot} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
