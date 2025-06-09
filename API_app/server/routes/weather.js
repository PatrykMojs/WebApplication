const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const apiKey = process.env.OPENWEATHER_API_KEY;

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Błąd API:', error.message);
    res.status(500).json({ error: 'Nie udało się pobrać pogody' });
  }
});

module.exports = router;
