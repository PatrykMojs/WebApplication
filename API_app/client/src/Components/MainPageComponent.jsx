import React from "react";
import { Link } from "react-router-dom";
import "./MainPageComponent.css";
import NavbarComponent from "./NavBar/NavbarComponent";

const MainPageComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="backgroundMainPage">
        <div className="main-container">
          <div className="header-section">
            <h1>Witaj w API Dashboard</h1>
            <p>Sprawdzaj pogodę i kursy walut w prosty sposób.</p>
          </div>

          <div className="grid-container">
            <Link to="/weather" className="card">
              <h2>🌤 Pogoda</h2>
              <p>Sprawdź aktualną pogodę w wybranym mieście.</p>
            </Link>

            <Link to="/curriences" className="card">
              <h2>💰 Kursy walut</h2>
              <p>Śledź najnowsze kursy walutowe.</p>
            </Link>
          </div>

          <div className="footer-section">
            <p>Autor aplikacji: <strong>Patryk Meus</strong></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPageComponent;
