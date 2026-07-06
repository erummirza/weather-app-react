
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';
import ErrorMessage from './components/ErrorMessage';
import { fetchCurrentWeather, fetchForecast, fetchWeatherByCoords } from './services/weatherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSpinner } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentCities, setRecentCities] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentCities');
    if (saved) {
      setRecentCities(JSON.parse(saved));
    }
  }, []);

  const addRecentCity = (city) => {
    const updated = recentCities.filter(c => c.toLowerCase() !== city.toLowerCase());
    updated.unshift(city);
    if (updated.length > 5) updated.pop();
    setRecentCities(updated);
    localStorage.setItem('recentCities', JSON.stringify(updated));
  };

  const fetchWeatherData = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const currentData = await fetchCurrentWeather(city);
      setCurrentWeather(currentData);

      const forecastData = await fetchForecast(city);
      setForecast(forecastData.list || []);

      addRecentCity(city);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          await fetchWeatherData(data.name);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      },
      () => {
        setError('Location access denied. Please enable location services.');
        setIsLoading(false);
      }
    );
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleRecentCityClick = (city) => {
    fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData('New York');
  }, []);

  return (
    <div className="dashboard">
      <h1>
        <FontAwesomeIcon icon={faCloudSun} /> Weather Dashboard
      </h1>

      <SearchBar
        onSearch={fetchWeatherData}
        onLocationSearch={handleLocationSearch}
        isLoading={isLoading}
      />

      <RecentSearches
        cities={recentCities}
        onCityClick={handleRecentCityClick}
      />

      {isLoading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading weather data...
        </div>
      )}

      <ErrorMessage 
        message={error} 
        onClose={() => setError(null)}
      />

      {currentWeather && (
        <CurrentWeather 
          data={currentWeather} 
          isCelsius={isCelsius} 
        />
      )}

      {forecast.length > 0 && (
        <Forecast 
          data={forecast} 
          isCelsius={isCelsius} 
        />
      )}

      <div className="footer-note">Data from OpenWeatherMap</div>

      {currentWeather && (
        <button onClick={toggleUnit} className="unit-toggle-fixed">
          {isCelsius ? '°C' : '°F'}
        </button>
      )}
    </div>
  );
}

export default App;
