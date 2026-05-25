
import './App.css'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clearSearch, setClearSearch] = useState(0);

  const handleOnSearchChange = (searchData) => {
    setLoading(true);
    setError("");

    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        if (!response[0].ok || !response[1].ok) {
          throw new Error("failed to fetch weather information")
        }
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })

      .catch((err) => {
        setError("Couldnt fetch weather data. Please try again!");

      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCurrentLocation = () => {

    setError("");
    setClearSearch((prev) => prev + 1);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const searchData = {
          value: `${position.coords.latitude} ${position.coords.longitude}`,
          label: "Current Location"
        };
        handleOnSearchChange(searchData);
      },

      (error) => {
        setError("Couldnt Access Location. Please try Again!");
      }
    );
  }

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} clearSearch={clearSearch} />
      <button onClick={handleCurrentLocation} className='current-location'>Use My Current Location</button>
      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  )
}

export default App
