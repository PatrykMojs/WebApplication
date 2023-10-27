import React from "react";
import './Popup.css';

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>

        <h2>Edycja profilu!</h2>

        <input type="text" className="inputAboutProfile" placeholder="Dodaj opis o sobie"/><br></br>

        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;