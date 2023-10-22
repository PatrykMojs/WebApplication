import React from 'react';
import './RegisterPage.css';
import LOGO4 from '../images/LOGO4.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'; 


export default function RegisterPage() {
    const [Nick, setNick] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();
    
    function validateNick() {
        if (Nick.length === 0) {
          alert('Niepoprawna długość nazwy użytkownika!');
          return;
        }
    
        if (Nick.trim() !== Nick) {
          alert('Nazwa użytkownika niepoprawna! Usuń spację');
          return;
        }
      }
    
      function validateLogin() {
        if (Login.length === 0) {
          alert('Niepoprawna długość Loginu!');
          return;
        }
    
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Login)) {
          alert('Niepoprawny E-mail!');
          return;
        }
      }
    
      function validatePassword() {
        if (Password.length < 8) {
          alert('Niepoprawna długość Hasła. Hasło musi mieć co najmniej 8 znaków!');
          return;
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

            if (countUpperLetters === 0) {
                alert('Błędne hasło! hasło musi miec co najmniej 1 wielka litere');
                return
              }

            if (countLowerLetters === 0) {
                alert('Błędne hasło! hasło musi miec co najmniej 1 małą litere')
                return
            }
          
            if (countDigit === 0) {
                alert('Błędne hasło! Hasło musi miec co najmniej 1 cyfrę')
                return
            }
          
            if (countSymbols === 0) {
                alert('Błędne hasło! Hasło musi miec co najmniej 1 znak specjalny!')
                return
            }
        }
        return true;
    }

    async function validateForm() {
        validateNick();
        validateLogin();
    
        if (!validatePassword()) {
          return;
        }
    
        try {
          const response = await axios.post('/register', {
            Nick,
            Login,
            Password,
          });
    
          if (response.data.success) {
            navigate('/'); // Używamy navigate do nawigacji
          } else {
            setRegistrationError('Błąd podczas rejestracji. Spróbuj ponownie.');
          }
        } catch (error) {
          setRegistrationError('Błąd podczas rejestracji. Spróbuj ponownie.');
        }
      }

   return (
    <>
      <div className="curve">
        <Link to="/">
          <div className="logo_register_page">
            <img className="logo_left" src={LOGO4} alt="LogoApp" />
            <img className="logo_right" src={LOGO4} alt="LogoApp" />
          </div>
        </Link>

        <div className="form_element">
          <div className="form">
            <form>
              <h1>Zarejestruj się!</h1>

              {registrationError && (
                <p className="registration-error">{registrationError}</p>
              )}

              <div className="values">
                <label>
                  Nick:
                  <br />
                  <input
                    name="nick"
                    type="text"
                    placeholder="Nick"
                    required
                    onChange={(e) => setNick(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Login:
                  <br />
                  <input
                    name="login"
                    type="email"
                    placeholder="Login"
                    required
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Hasło:
                  <br />
                  <input
                    name="password"
                    type="password"
                    placeholder="Hasło"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
            </form>

            <div className="buttonsRegister">
              <Link to="/" onClick={validateForm}>
                Zarejestruj się!
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