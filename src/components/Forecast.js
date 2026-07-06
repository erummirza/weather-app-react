
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { getWeatherIcon, kelvinToCelsius, celsiusToFahrenheit } from '../utils/helpers';

const Forecast = ({ data, isCelsius }) => {
  if (!data || data.length === 0) {
    return <div className="forecast-empty">No forecast data available</div>;
  }

  const dailyMap = new Map();
  data.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US');
    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, item);
    }
  });

  const days = Array.from(dailyMap.values()).slice(0, 5);

  return (
    <>
      <div className="forecast-title">
        <FontAwesomeIcon icon={faCalendarAlt} /> 5-Day Forecast
      </div>
      <div className="forecast-grid">
        {days.map((day, index) => {
          const dateObj = new Date(day.dt * 1000);
          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          const iconCode = day.weather[0]?.icon || '01d';
          const faIcon = getWeatherIcon(iconCode);
          const tempC = kelvinToCelsius(day.main.temp);
          const displayTemp = isCelsius ? tempC : celsiusToFahrenheit(tempC);
          const desc = day.weather[0]?.description || '';

          return (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{dayName}</div>
              <div className="forecast-icon">
                <FontAwesomeIcon icon={faIcon} />
              </div>
              <div className="forecast-temp">
                {displayTemp.toFixed(1)}<sup>{isCelsius ? '°C' : '°F'}</sup>
              </div>
              <div className="forecast-desc">{desc}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Forecast;
