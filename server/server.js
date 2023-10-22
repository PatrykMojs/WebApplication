const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb+srv://projektgrupowy5pcz:kKpxtdXOmizAU6ll@cluster0.azfmzmy.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Błąd połączenia z bazą danych:'));
db.once('open', () => {
    console.log('Połączono z bazą danych');
});

// Definicja modelu danych
const userSchema = new mongoose.Schema({
    Nick: String,
    Login: String,
    Password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Obsługa logowania użytkownika
app.post('/login', async (req, res) => {
    const { Login, Password } = req.body;

    try {
        // Sprawdź, czy istnieje użytkownik o podanym loginie
        const user = await User.findOne({ Login });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Nieprawidłowy login lub hasło' });
        }

        // Porównaj podane hasło z hasłem w bazie danych
        if (user.Password !== Password) {
            return res.status(401).json({ success: false, message: 'Nieprawidłowy login lub hasło' });
        }

        // Logowanie powiodło się
        res.status(200).json({ success: true, message: 'Zalogowano pomyślnie' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Błąd logowania' });
    }
});

// Obsługa rejestracji
app.post('/register', (req, res) => {
    const { Nick, Login, Password } = req.body;

    // Walidacja i zapis do bazy danych
    const newUser = new User({ Nick, Login, Password });
    newUser.save((err) => {
        if (err) {
            console.error('Błąd podczas zapisu użytkownika do bazy danych:', err);
            res.status(500).json({ message: 'Błąd podczas rejestracji' });
        } else {
            console.log('Użytkownik zarejestrowany');
            res.status(200).json({ message: 'Rejestracja udana' });
        }
    });
});

app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
