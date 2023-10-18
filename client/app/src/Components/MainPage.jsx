import './MainPage.css';
import React from 'react';

export default function MainPage(){

    return(
        <>
            <div class="formBG">
                <form>
                    <h1>Zaloguj się!</h1>

                    <div className="values">
                        <label>
                            Login: 
                            <br></br>
                            <input name="login" type="email" placeholder='Login' required/>
                        </label>
                        <br></br>
                        <label>
                            Hasło: 
                            <br></br>
                            <input name="password" type="password" placeholder='Hasło' required/>
                        </label>
                    </div>
                </form>
                
                <div className="buttons">
                    <button>Zarejestruj się!</button>
                    <button>Zaloguj się!</button>
                </div>
            </div>
        </>
    );
}