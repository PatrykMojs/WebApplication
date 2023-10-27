import './StartPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';
import DropDownList from './DropDownList/DropDownList';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Dodaj ten import
import Popup from './Popup';

export default function StartPage() {
    const [openProfile, setOpenProfile] = useState(false); // Deklaracja openProfile w stanie
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nick = searchParams.get('nick');
    const [topPlayers, setTopPlayers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [about, setAbout] = useState('');
    //---------------> Logout <----------------------------------
    const handleLogout = async () => {
        try {
          // Wyślij żądanie wylogowania na serwer
          const response = await axios.get('http://localhost:3001/logout');
    
          if (response.data.success) {
            // Jeśli wylogowanie powiodło się, przekieruj użytkownika na stronę MainPage
            window.location.href = '/';
          } else {
            console.log('Błąd wylogowania');
          }
        } catch (error) {
          console.error(error);
        }
      };
    //-------------> Burger Menu <-----------------------------
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () =>{
        if(!isMenuClicked){
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        }else{
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    }

    //--------------> Popup <-------------------------------------
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

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

      useEffect(() => {
        axios.get(`http://localhost:3001/getAbout/${nick}`)
          .then((response) => {
            setAbout(response.data.about);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [nick]);
    return (
        <>
            <nav className="navbar">

                <ul>
                    <li>
                        <img src={LOGO4} alt="LogoApp" />
                    </li>

                    <li className="liMenuStyle">Witaj w Mole Escape</li>


                    <li className="BurgerMenu">
                        <div className="burgerStyle">
                            <nav>
                                <div className="burger-menu" onClick={updateMenu}>
                                    <div className={burger_class}></div>
                                    <div className={burger_class}></div>
                                    <div className={burger_class}></div>
                                </div>

                            </nav>
                        </div>

                        <div className={menu_class}>

                            <div className="firstRow">

                                <div className="NickNameProfile">
                                    <p>{nick}</p>
                                </div>

                                <button className="EditButton" onClick={togglePopup}>Edytuj</button>

                            </div>

                            <div className="secondRow">
                                <p>{about}</p>
                            </div>

                            <div className="thirdRow">
                                <button onClick={handleLogout}>Wyloguj się!</button>
                            </div>

                        </div>

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
                    <li key={index}>{index + 1}. {player.Nick} - Wynik: {player.Score}</li>
                    ))}
                </ul>
                </div>
            </div>

            {
                openProfile && <DropDownList/>
            }

            {isOpen && <Popup content={
                <>
                    <button onClick={togglePopup}>Zamknij</button>
                </>}
                handleClose={togglePopup}
                nick={nick}
            />}

        </>
    );
}