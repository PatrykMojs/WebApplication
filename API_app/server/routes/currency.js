const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/currenciesA', async (req, res) => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/A');
    res.json(response.data);
  } catch (error) {
    console.error('Błąd API:', error.message);
    res.status(500).json({ error: 'Nie udało się pobrać kursów walut' });
  }
});

router.get('/currencies', async (req, res) => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/C');
    res.json(response.data);
  } catch (error) {
    console.error('Błąd API:', error.message);
    res.status(500).json({ error: 'Nie udało się pobrać kursów walut' });
  }
});

router.get('/exchangerateofcurrency/:code/:startDate/:endDate', async (req, res) => {
  const { code, startDate, endDate } = req.params;
  const apiUrl = `http://api.nbp.pl/api/exchangerates/rates/C/${code}/${startDate}/${endDate}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Błąd API:', error.message);
    res.status(500).json({ error: 'Nie udało się pobrać danych o walucie' });
  }
});

module.exports = router;
