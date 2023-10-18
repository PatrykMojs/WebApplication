import React from 'react';
import './RegisterPage.css';

export default function RegisterPage(){
    return(
        <>
            <div class="formBG">
                <form>
                    <h1>Zarejestruj się!</h1>

                    <div className="values">

                        <label>
                            Nick:
                            <br></br>
                            <input name="nick" type="text" placeholder="Nick" required/>
                        </label>
                        <br></br>
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
                
                <div className="buttonRegister">
                    <button>Zarejestruj się!</button>
                </div>
            </div>
        </>
    );
}