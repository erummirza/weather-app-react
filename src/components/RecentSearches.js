
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const RecentSearches = ({ cities, onCityClick }) => {
  if (!cities || cities.length === 0) {
    return (
      <div className="recent-searches">
        <FontAwesomeIcon icon={faClock} /> Recent: None
      </div>
    );
  }

  return (
    <div className="recent-searches">
      <FontAwesomeIcon icon={faClock} /> Recent:
      {cities.map((city, index) => (
        <span key={index} onClick={() => onCityClick(city)}>
          {city}
        </span>
      ))}
    </div>
  );
};

export default RecentSearches;
