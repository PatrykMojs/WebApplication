require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const weatherRoutes = require('./routes/weather');
const currencyRoutes = require('./routes/currency');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://twojastrona.com', 'http://localhost:3000'],
  optionsSuccessStatus: 200
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/weather', weatherRoutes);
app.use('/currency', currencyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Coś poszło nie tak!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});