import './MainPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';
import axios from 'axios';

export default function MainPage() {
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  const [LoginError, setLoginError] = useState('');
  const [Nick, setNick] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/check-login').then((response) => {
      if (response.data.success) {
        const nick = response.data.nick;
        setNick(nick);
        navigate(`/start?nick=${nick}`);
      }
    });
  }, []);


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        Login,
        Password,
      });

      if (response.data.success) {
        const nick = response.data.nick;
        setNick(nick);
        navigate(`/start?nick=${nick}`);
      } else {
        setLoginError('Błąd logowania. Spróbuj ponownie.');
        alert('Błąd logowania. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Błąd logowania. Spróbuj ponownie.');
      alert('Błąd logowania. Spróbuj ponownie.');
    }
  };

  return (
    <>
      <div className="logoApp">
        <img src={LOGO4} alt="LogoApp" />
      </div>

      <div className="form_element_login">
        <div className="formBG">
          <form>
            <h1>Logowanie!</h1>

            <div className="values">
              <label>
                {/* Email: */}
                <br />
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={Login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </label>
              <br />
              <label>
                {/* Hasło: */}
                <br />
                <input
                  type="password"
                  placeholder="Hasło"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </form>

          <div className="buttons">
            <Link to="/register">
              <button>Zarejestruj się!</button>
            </Link>
            <button onClick={handleLogin}>Zaloguj się!</button>

            {/* <Link to="/start">
              <button>start!</button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}