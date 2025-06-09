import React from 'react';
import MainPageComponent  from './Components/MainPageComponent';
import WeatherComponent from './Weather/WeatherComponent';
import CurriencesComponent from './Curriences/CurriencesComponent';
import DetailsCurriencesComponent from './Curriences/DetailsCurriences/DetailsCurriencesComponent';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<MainPageComponent />} />
          <Route path="/weather" element={<WeatherComponent />} />
          <Route path="/curriences" element={<CurriencesComponent />} />
          <Route path='/detailsCurrency/:currency' element={<DetailsCurriencesComponent/>}/>
        </Routes>
      </header>
    </div>
  );
};

export default App;
