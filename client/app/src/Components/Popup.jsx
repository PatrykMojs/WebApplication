import React from "react";
import './Popup.css';
import axios from 'axios';
import { useState } from 'react'; 
const Popup = props => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
    const updateAbout = () => {
      const nick = props.nick;
      if(inputValue.length!=0){
      axios.post(`http://localhost:3001/updateAbout/${nick}`, { inputValue })
        .then(response => {props.handleClose()})
        .catch(error => {});
      }
    };
  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>

        <h2>Edycja profilu!</h2>

        <input type="text" className="inputAboutProfile" placeholder="Dodaj opis o sobie" value={inputValue} onChange={handleInputChange}/><br></br>
        <button onClick={updateAbout}>Zaktualizuj</button>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;