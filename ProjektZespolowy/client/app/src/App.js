import './App.css';
import MainPage from './Components/MainPage';
import RegisterPage from './Components/RegisterPage';
import StartPage from './Components/StartPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
