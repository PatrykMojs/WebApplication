import React, { useState } from "react";
import "./WeatherComponent.css";
import DataWeatherComponent from "./DataWeather/DataWeatherComponent";
import NavbarComponent from "../Components/NavBar/NavbarComponent";

const WeatherComponent = () => {
  const [backgroundClass, setBackgroundClass] = useState("");

  return (
    <>
      <NavbarComponent />
      <div className={`weatherBackground ${backgroundClass}`}>
        <div className="weather-container">
          <h1 className="weather-title">🌤 Sprawdź aktualną pogodę</h1>
          <DataWeatherComponent onBackgroundClassChange={setBackgroundClass} />
        </div>
      </div>
    </>
  );
};

export default WeatherComponent;
