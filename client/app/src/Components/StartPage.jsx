import './StartPage.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LOGO4 from '../images/LOGO4.png';
import DropDownList from './DropDownList/DropDownList';
import Popup from './Popup';

const nick = localStorage.getItem("userNick");

export default function StartPage() {
    const [openProfile, setOpenProfile] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nick = searchParams.get('nick');
    const [topPlayers, setTopPlayers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [about, setAbout] = useState('');

    const navigate = useNavigate();

    function przejdzDoStartPage() {
      navigate('/start');
    };

    //---------------> Logout <----------------------------------
    const handleLogout = async () => {
        try {
          const response = await axios.get('http://localhost:3001/logout');
    
          if (response.data.success) {
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
                                    <p className="NickNameProfileParagraph">{nick}</p>
                                </div>

                            </div>

                            <div className="secondRow">
                                <h3>Opis:</h3>
                                <p>{about}</p>
                            </div>

                            <div className="thirdRow">
                                <button className="EditButton" onClick={togglePopup}>Edytuj opis</button>
                                <button className="LogOutButton" onClick={handleLogout}>Wyloguj się!</button>
                            </div>

                        </div>

                    </li>
                </ul>
            </nav>

            <div className="inlineBox">
                <div className="FirstBox">
                    <a href={`/game.html?nick=${nick}`}>
                        <img src={LOGO4} alt="LogoApp" />
                        <p>Zagraj już teraz!</p>
                    </a>
                </div>



                <div className="SecondBox">

                    <h2>Zasady gry</h2>

                    <div className="optionsGame">
                        <p>Gra Mole Escape polega na sterowaniu krecikiem klawiszami: w - góra, a - lewo, s - dół, d - prawo. </p>
                        <p>Trzeba zbierać owoce które dają 1 punkt, donaty które dają 5 punktów, </p>
                        <p>Natomiast gdy krecik zje kupe to straci 3 punkty.</p> 
                        <p>Żeby nie przegrać trzeba omijać starą babcię oraz gniewnego młodego rolinka.</p>
                        <p>W grze naliczają się punkty zdobyte punkty oraz odlicza się czas rozgrywki.</p>
                    </div> 

                </div>

                <div className="ThirdBox">
                <h2>TOP 5 Graczy</h2>
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

            {isOpen && <Popup 
                handleClose={togglePopup}
                nick={nick}
            />}

        </>
    );
}