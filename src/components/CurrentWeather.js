
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTint, faCompressAlt, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { getWeatherIcon, getCurrentDateTime, kelvinToCelsius, celsiusToFahrenheit } from '../utils/helpers';

const CurrentWeather = ({ data, isCelsius }) => {
  if (!data) return null;

  const { main, weather, wind, sys, name } = data;
  const tempC = kelvinToCelsius(main.temp);
  const displayTemp = isCelsius ? tempC : celsiusToFahrenheit(tempC);
  const iconCode = weather[0].icon;
  const faIcon = getWeatherIcon(iconCode);
  const dateTime = getCurrentDateTime();

  return (
    <div className="current-weather">
      <div className="city-info">
        <div className="city-name">
          <FontAwesomeIcon icon={faMapPin} /> {name}, {sys.country}
        </div>
        <div className="date-time">{dateTime}</div>
      </div>
      <div className="weather-temp">
        <span className="temp-big">
          {displayTemp.toFixed(1)}<sup>{isCelsius ? '°C' : '°F'}</sup>
        </span>
        <div className="weather-condition">
          <div className="condition-icon">
            <FontAwesomeIcon icon={faIcon} />
          </div>
          <div className="condition-text">{weather[0].description}</div>
        </div>
      </div>
      <div className="extra-details">
        <span className="extra-item">
          <FontAwesomeIcon icon={faWind} />
          <span>{wind.speed.toFixed(1)} m/s</span>
        </span>
        <span className="extra-item">
          <FontAwesomeIcon icon={faTint} />
          <span>{main.humidity} %</span>
        </span>
        <span className="extra-item">
          <FontAwesomeIcon icon={faCompressAlt} />
          <span>{main.pressure} hPa</span>
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
