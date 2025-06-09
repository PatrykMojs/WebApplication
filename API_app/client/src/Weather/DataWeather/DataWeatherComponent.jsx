import React, { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import "./DataWeatherComponent.css";

const DataWeatherComponent = ({ onBackgroundClassChange }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!city.trim()) {
      setError("Podaj nazwę miasta!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:5000/weather/${city}`);
      setWeatherData(response.data);
      
      if (response.data.weather.length > 0) {
        onBackgroundClassChange(determineBackgroundClass(response.data.weather[0].main));
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error.message);
      setError("Nie udało się pobrać danych pogodowych.");
    } finally {
      setLoading(false);
    }
  };

  const determineBackgroundClass = (weather) => {
    switch (weather.toLowerCase()) {
      case "rain":
        return "rain-weather-background";
      case "clouds":
        return "clouds-weather-background";
      default:
        return "clear-weather-background";
    }
  };

  return (
    <div className="weather-box">
      <div className="formLocation">
        <input type="text" placeholder="Wpisz miasto..." value={city} onChange={(e) => setCity(e.target.value)} />
        <button onClick={fetchData}>🔍 Szukaj</button>
      </div>

      <div className="weather-info">
        {loading ? (
          <div className="loading">
            <h3>Ładowanie danych...</h3>
            <BeatLoader color="#36D7B7" size={15} />
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : weatherData ? (
          <div className="weather-details">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>🌡 Temperatura: {Math.round(weatherData.main.temp)}°C</p>
            <p>💨 Wiatr: {weatherData.wind.speed} m/s</p>
            <p>💧 Wilgotność: {weatherData.main.humidity}%</p>
            <p>☁ Zachmurzenie: {weatherData.clouds.all}%</p>
          </div>
        ) : (
          <p>Wpisz miasto, aby zobaczyć pogodę.</p>
        )}
      </div>
    </div>
  );
};

export default DataWeatherComponent;
