import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from "../../Components/NavBar/NavbarComponent";
import ChartCurriencesComponent from "./ChartCuriences/ChartCurriencesComponent";
import './DetailsCurriencesComponent.css';

const fetchData = async (code, startDate, endDate, setDataCurience) => {
    console.log(`🔍 Pobieranie danych z: http://localhost:5000/currency/exchangerateofcurrency/${code}/${startDate}/${endDate}`);
    
    if (!code) {
        console.error("❌ BŁĄD: `code` jest pusty!");
        return;
    }

    try {
        const response = await axios.get(`http://localhost:5000/currency/exchangerateofcurrency/${code}/${startDate}/${endDate}`);
        console.log("✅ Odpowiedź API:", response.data);
        
        if (!response.data || !response.data.rates) {
            throw new Error("Brak danych o kursach walut.");
        }

        setDataCurience(response.data.rates);
    } catch (error) {
        console.error("❌ Błąd pobierania danych:", error.message);
    }
};



const DetailsCurriencesComponent = () => {
    const { currency } = useParams();
    const [dataCurience, setDataCurience] = useState([]);
    const [startDate, setStartDate] = useState('2023-03-03');
    const [endDate, setEndDate] = useState('2024-01-20');
    const [code, setCode] = useState('');

    useEffect(() => {
        findCode(currency);
        fetchData(code, startDate, endDate, setDataCurience);
    }, [code, startDate, endDate]);

    const findCode = async (currency) => {
        console.log(`🔍 Szukam kodu dla waluty: ${currency}`);
    
        try {
            const response = await axios.get("http://localhost:5000/currency/currencies");
            console.log("✅ Odpowiedź API (lista walut):", response.data);
            const data = response.data[0].rates;
            console.log("🔍 Lista dostępnych walut:", data);

    
            const foundCurrency = data.find((object) => object.code.toUpperCase() === currency.toUpperCase());
    
            if (foundCurrency) {
                console.log(`✅ Znaleziono kod waluty: ${foundCurrency.code}`);
                setCode(foundCurrency.code);
            } else {
                console.error(`❌ Nie znaleziono kodu dla: ${currency}`);
            }
        } catch (error) {
            console.error("❌ Błąd pobierania danych:", error.message);
        }
    };
    
    
    return (
        <>
           <div className="backgroundDetailsCurrency">
                <NavbarComponent/>
                <div className="containerFormChart">
                    <form id="formCurriences">
                        <label>
                            Ustaw datę początkową:<br />
                            <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
                        </label>
                        <label>
                            Ustaw datę końcową:<br />
                            <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
                        </label>
                    </form>

                    <ChartCurriencesComponent dataCurience={dataCurience} id="chartCurriences"/>
                </div>
           </div>
        </>
    );
};

export default DetailsCurriencesComponent;
