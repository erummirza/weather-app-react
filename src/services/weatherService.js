
const API_KEY = 'cace0afc08a7d4ddabad88ff06cf80d6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchCurrentWeather = async (city) => {
  const cityEncoded = encodeURIComponent(city.trim());
  const url = `${BASE_URL}weather?q=${cityEncoded}&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap key.');
    } else if (response.status === 404) {
      throw new Error(`City "${city}" not found. Please check spelling.`);
    } else {
      throw new Error(`Error ${response.status}: Unable to fetch weather.`);
    }
  }
  
  return await response.json();
};

export const fetchForecast = async (city) => {
  const cityEncoded = encodeURIComponent(city.trim());
  const url = `${BASE_URL}forecast?q=${cityEncoded}&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Unable to fetch forecast data.');
  }
  
  return await response.json();
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const url = `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Unable to get location weather.');
  }
  
  return await response.json();
};
