import './StartPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';
import DropDownList from './DropDownList/DropDownList';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Dodaj ten import

export default function StartPage() {
    const [openProfile, setOpenProfile] = useState(false); // Deklaracja openProfile w stanie
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nick = searchParams.get('nick');
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        // Tutaj należy wykonać żądanie do serwera, aby pobrać najlepszych graczy
        axios.get('http://localhost:3001/top-players')
          .then((response) => {
            setTopPlayers(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
 
    return (
        <>
            <nav className="navbar">

                <ul>
                    <li>
                        <img src={LOGO4} alt="LogoApp" />
                    </li>

                    <li className="liMenuStyle">Witaj, {nick}</li>


                    <li>
                        <button className="ProfileButton" onClick={() => setOpenProfile
                            ((prev)=>!prev)}>P</button>
                    </li>
                </ul>
            </nav>

            <div className="inlineBox">
                <div className="FirstBox">
                    <img src={LOGO4} alt="LogoApp" />
                    <p>Zagraj już teraz!</p>
                </div>

                <div className="SecondBox">

                    <h1>Zasady gry</h1>

                    <p>Gra Mole Escape polega na sterowaniu krecikiem klawiszami: w - góra, a - lewo, s - dół, d - prawo. </p>
                    <p>Trzeba zbierać owoce które dają 1 punkt, donaty które dają 5 punktów, </p>
                    <p>Natomiast gdy krecik zje kupe to straci 3 punkty.</p> 
                    <p>Żeby nie przegrać trzeba omijać starą babcię oraz gniewnego młodego rolinka.</p>
                    <p>W grze naliczają się punkty zdobyte punkty oraz odlicza się czas rozgrywki.</p> 

                </div>

                <div className="ThirdBox">
                <h1>TOP 5 Graczy</h1>
                <ul>
                    {topPlayers.map((player, index) => (
                    <li key={index}>{index + 1}. {player.Nick} - Score: {player.Score}</li>
                    ))}
                </ul>
                </div>
            </div>

            {
                openProfile && <DropDownList/>
            }

        </>
    );
}