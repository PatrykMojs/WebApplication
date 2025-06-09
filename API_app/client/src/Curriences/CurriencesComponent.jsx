import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CurriencesComponent.css";
import NavbarComponent from "../Components/NavBar/NavbarComponent";
import TableCurrenciesComponent from './Tables/TableCurrienceComponent';

const CurrenciesComponent = () => {
  const [tableA, setTableA] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTableA = await axios.get("http://localhost:5000/currency/currenciesA");

        if (!responseTableA.data || responseTableA.data.length === 0) {
          throw new Error("Brak danych z API.");
        }

        const rates = responseTableA.data[0].rates;
        if (!rates) {
          throw new Error("Nie znaleziono danych o walutach.");
        }

        setTableA(Object.values(rates));
      } catch (error) {
        console.error("Błąd podczas pobierania danych: ", error.message);
        setError("Nie udało się pobrać danych walutowych.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="currencies-container">
        <h1 className="currencies-title">💱 Aktualne kursy walut</h1>
        {error ? <p className="error-message">{error}</p> : <TableCurrenciesComponent value={tableA} />}
      </div>
    </>
  );
};

export default CurrenciesComponent;