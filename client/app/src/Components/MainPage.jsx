import './MainPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <>
      <div className="formBG">
        <form>
          <h1>Zaloguj się!</h1>

          <div className="values">
            <label>
              Login:
              <br></br>
              <input name="login" type="email" placeholder="Login" required />
            </label>
            <br></br>
            <label>
              Hasło:
              <br></br>
              <input name="password" type="password" placeholder="Hasło" required />
            </label>
          </div>
        </form>

        <div className="buttons">
          <Link to="/register">
            <button>Zarejestruj się!</button>
          </Link>
          <Link to="/start">
            <button>Zaloguj się!</button>
          </Link>
        </div>
      </div>
    </>
  );
}
