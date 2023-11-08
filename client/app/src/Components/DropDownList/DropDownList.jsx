import React from 'react';
import './DropDownList.css';
import axios from 'axios';

const DropDownList = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3001/logout');

      if (response.data.success) {
        window.location.href = '/';
      } else {
        console.log('Błąd wylogowania');
      }
    } catch (error) {
      console.error(error);
    }
  };

    return(
        <div className="flex flex-col dropdownList">
            <ul className="flex flex-col gap-4">
                <li className="liStyle">Przejdź do profilu</li>
                <li className="liStyle" onClick={handleLogout}>Wyloguj się</li>
            </ul>
        </div>
    );
}

export default DropDownList