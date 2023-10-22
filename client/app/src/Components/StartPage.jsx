import './StartPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';

export default function StartPage(){
    return (
        <>
            <nav className="navbar">

                <ul>
                    <li>
                        <img src={LOGO4} alt="LogoApp" />
                    </li>
                    <li className="MenuElements">
                       O nas
                    </li>
                    <li className="MenuElements">
                        Produkty 
                    </li>
                    <li className="MenuElements">
                        Kontakt
                    </li>

                    <li>
                        <button className="ProfileButton">P</button>
                    </li>
                </ul>
            </nav>

            <div className="inlineBox">
                <div className="FirstBox">
                    <img src={LOGO4} alt="LogoApp" />
                    <p>Zagraj już teraz!</p>
                </div>

                <div className="SecondBox">

                    <h1>Zagraj w Mole escape</h1>

                    <p>Już teraz możesz przeżyć niesamowitą przygode grając w MOLE ESCAPE. Nie wachaj się graj już teraz!</p>

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

        </>
    );
}