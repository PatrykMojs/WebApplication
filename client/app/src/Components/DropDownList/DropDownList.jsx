import React from 'react';
import './DropDownList.css'

const DropDownList = () =>{
    return(
        <div className="flex flex-col dropdownList">
            <ul className="flex flex-col gap-4">
                <li className="liStyle">Przejdź do profilu</li>
                <li className="liStyle">Wyloguj się</li>
            </ul>
        </div>
    );
}

export default DropDownList