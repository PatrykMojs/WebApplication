import React, { useState, useEffect } from "react";
import './Popup.css';
import axios from 'axios';

const Popup = props => {
    const [inputValue, setInputValue] = useState('');
    const [currentAbout, setCurrentAbout] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const fetchAbout = (nick) => {
        axios.get(`http://localhost:3001/getAbout/${nick}`)
            .then((response) => {
                setCurrentAbout(response.data.about);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const nick = props.nick;
        if (nick) {
            fetchAbout(nick);
        }
    }, [props.nick]);

    useEffect(() => {
        setInputValue(currentAbout);
    }, [currentAbout]);

    const updateAbout = () => {
        const nick = props.nick;
        if (inputValue.length !== 0) {
            axios.post(`http://localhost:3001/updateAbout/${nick}`, { inputValue })
                .then(response => {
                    props.handleClose();
                    window.location.reload(); // Odśwież stronę po aktualizacji opisu
                })
                .catch(error => { });
        }
    };

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <h2>Edytuj opis!</h2>

                <input type="text" className="inputAboutProfile" placeholder="Dodaj opis o sobie" value={inputValue} onChange={handleInputChange} /><br></br>
                
                <div className="popupButtons">
                    <button onClick={updateAbout}>Zaktualizuj</button>
                    <button onClick={props.handleClose}>Zamknij</button>
                </div>

                {props.content}
            </div>
        </div>
    );
};

export default Popup;
