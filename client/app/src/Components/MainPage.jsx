import './MainPage.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LOGO4 from '../images/LOGO4.png';
import axios from 'axios';
import { useState } from 'react'; 

export default function MainPage() {
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  const [LoginError, setLoginError] = useState('');
  const navigate = useNavigate(); // Używamy useNavigate zamiast useHistory

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        Login,
        Password,
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

            {LoginError && <p className="login-error">{LoginError}</p>}

            <div className="values">
              <label>
                Login:
                <br />
                <input
                  type="text"
                  placeholder="Login"
                  required
                  value={Login}
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
                  value={Password}
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