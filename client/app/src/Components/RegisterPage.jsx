import React from 'react';
import './RegisterPage.css';
import LOGO4 from '../images/LOGO4.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterPage(){

    const [Nick, setNick] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassowrd] = useState('');

    function validateNick(){
        if(Nick.length==0){
            alert('Nie poprawna długość nazwy użytkownika!');
            return 
        }

        if(Nick.trim()!==Nick){
            alert('Nazwa użytkownika niepoprawna! Usuń spację');
            return 
        }
    }

    function validateLogin(){
        if(Login.length==0){
            alert('Nie poprawna długość Loginu!');
            return 
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Login)) {
            alert('Nie poprawny E-mail!');
            return 
        }

    }

    function validatePassword(){
        if(Password.length<8){
            alert('Nie poprawna długość Hasło. Hasło musi miec co najmniej 8 znaków!');
            return 
        }

        let countUpperLetters = 0;
        let countLowerLetters = 0;
        let countDigit = 0;
        let countSymbols = 0;

        for(let i=0; i<Password.length; i++){
            const Symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>'];

            if(Symbols.includes(Password[i])){
                countSymbols++;
            }else if(!isNaN(Password[i]*1)){
                countDigit++;
            }else{
                if(Password[i]==Password[i].toUpperCase()){
                    countUpperLetters++;
                }

                if(Password[i]==Password[i].toLowerCase()){
                    countLowerLetters++;
                }
            }

            if (countUpperLetters < 0) {
                alert('Błędne hasło! hasło musi miec co najmniej 1 wielka litere');
                return
              }

            if (countLowerLetters < 0) {
                alert('Błędne hasło! hasło musi miec co najmniej 1 małą litere')
                return
            }
          
            if (countDigit < 0) {
                alert('Błędne hasło! Hasło musi miec co najmniej 1 cyfrę')
                return
            }
          
            if (countSymbols < 0) {
                alert('Błędne hasło! Hasło musi miec co najmniej 1 znak specjalny!')
                return
            }
        }
    }

    function validateForm(){

        validateNick();
        validateLogin();
        validatePassword();

    }

    return(
        <>
            <div className="curve">
                <div className="logo_register_page">
                    <img class="logo_left" src={LOGO4} alt="LogoApp" />
                    <img class="logo_right" src={LOGO4} alt="LogoApp" />
                </div>

                <br></br>

                <div className="form_element">
                    <div class="form">
                        <form>
                            <h1>Zarejestruj się!</h1>

                            <div className="values">

                                <label>
                                    Nick:
                                    <br></br>
                                    <input name="nick" type="text" placeholder="Nick" required onChange={(e)=>setNick(e.target.value)}/>
                                </label>
                                <br></br>
                                <label>
                                    Login: 
                                    <br></br>
                                    <input name="login" type="email" placeholder='Login' required onChange={(e)=>setLogin(e.target.value)}/>
                                </label>
                                <br></br>
                                <label>
                                    Hasło: 
                                    <br></br>
                                    <input name="password" type="password" placeholder='Hasło' required onChange={(e)=>setPassowrd(e.target.value)}/>
                                </label>
                            </div>
                        </form>
                        
                        <div className="buttonsRegister">
                        <Link to="/">
                            <button type="submit" onClick={validateForm}>Zarejestruj się!</button>
                        </Link>
                        <Link to="/">
                            <button>Powrót</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}