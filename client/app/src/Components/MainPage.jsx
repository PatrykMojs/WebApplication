import './MainPage.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';
import axios from 'axios';
import { useState } from 'react'; 

export default function MainPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); // Używamy useNavigate zamiast useHistory

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        login,
        password,
      });

      if (response.data.success) {
        navigate('/start'); // Używamy navigate do nawigacji
      } else {
        setLoginError('Błąd logowania. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Błąd logowania. Spróbuj ponownie.');
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
            <h1>Zaloguj się!</h1>

            {loginError && <p className="login-error">{loginError}</p>}

            <div className="values">
              <label>
                Login:
                <br />
                <input
                  type="text"
                  placeholder="Login"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </label>
              <br />
              <label>
                Hasło:
                <br />
                <input
                  type="password"
                  placeholder="Hasło"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </form>

          <div className="buttons">
            <Link to="/register">Zarejestruj się!</Link>
            <button onClick={handleLogin}>Zaloguj się!</button>
          </div>
        </div>
      </div>
    </>
  );
}