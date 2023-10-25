import './StartPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';
import DropDownList from './DropDownList/DropDownList';
import { useState } from 'react';

export default function StartPage(){

    const [openProfile, setOpenProfile] = useState(false);

    return (
        <>
            <nav className="navbar">

                <ul>
                    <li>
                        <img src={LOGO4} alt="LogoApp" />
                    </li>

                    <li className="liMenuStyle">Witaj, Użytkowniku</li>

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

                    <ul>
                        <li>Uzytkownik 1</li>
                        <li>Uzytkownik 2</li>
                        <li>Uzytkownik 3</li>
                        <li>Uzytkownik 4</li>
                        <li>Uzytkownik 5</li>
                    </ul>
                    
                </div>
            </div>

            {
                openProfile && <DropDownList/>
            }

        </>
    );
}