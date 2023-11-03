const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors())
const port = process.env.PORT || 3001;

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb+srv://projektgrupowy5pcz:kKpxtdXOmizAU6ll@cluster0.azfmzmy.mongodb.net/users', {
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
    Nick: { type: String, unique: true, required: true },
    Login: { type: String, unique: true, required: true },
    Password: { type: String, required: true },
    Score: { type: Number, default: 0 },
    About: { type: String, default: "Cześć! Jestem nowym graczem Mole Escape" }
}, { timestamps: true }
);

// Inicjalizacja sesji
app.use(session({
    secret: 'secret-key', // Sekret używany do zabezpieczenia sesji
    resave: false,
    saveUninitialized: true
}));

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Obsługa logowania użytkownika
app.post('/login', async (req, res) => {
    const { Login, Password } = req.body;
    console.log(Login, Password);
    try {
        const user = await User.findOne({ Login });
        console.log(user);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Nieprawidłowy login lub hasło' });
        }

        if (user.Password !== Password) {
            return res.status(401).json({ success: false, message: 'Nieprawidłowy login lub hasło' });
        }

        // Zapisz informacje o zalogowanym użytkowniku w sesji
        req.session.user = user;

        res.status(200).json({ success: true, message: 'Zalogowano pomyślnie', nick: user.Nick });
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
    newUser.save()
        .then(() => {
            console.log('Użytkownik zarejestrowany');
            return res.json({ success: true });

        })
        .catch((err) => {
            console.error('Błąd podczas zapisu użytkownika do bazy danych:', err);
            return res.json({ success: false, error: err });
        });

});
app.post('/updateAbout/:nick', (req, res) => {
    const nick = req.params.nick;
    const inputValue = req.body.inputValue;
    User.findOneAndUpdate(
        { Nick: nick },
        { $set: { About: inputValue } },
      )
        .then((doc) => {
          if (!doc) {
            res.status(404).json({ error: 'Nie znaleziono dokumentu do zaktualizowania' });
          } else {
            console.log("Zmieniono opis");
            res.json({ message: 'Dokument zaktualizowany pomyślnie' });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Błąd podczas aktualizacji dokumentu' });
        });
    });
app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ success: true, nick: req.session.user.Nick });
    } else {
        res.json({ success: false });
    }
});

app.get('/logout', (req, res) => {
    // Zniszcz sesję (wyloguj użytkownika)
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

app.get('/top-players', async (req, res) => {
    try {
        const topPlayers = await User.find({}, 'Nick Score').sort({ Score: -1 }).limit(5);
        res.json(topPlayers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Błąd podczas pobierania danych o najlepszych graczach' });
    }
});
app.get('/getAbout/:nick', (req, res) => {
    const nick = req.params.nick;
    User.findOne({ Nick: nick })
      .then((user) => {
        if (user) {
          res.json({ about: user.About });
        } else {
          res.status(404).json({ error: 'Użytkownik nie znaleziony' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Błąd podczas pobierania informacji o polu opisu' });
      });
  });
  app.post('/submit-score', (req, res) => {
    const { nick, score } = req.body;
    User.findOneAndUpdate({ Nick: nick, Score: { $lt: score } }, { Score: score }, { new: true })
    .then(updatedUser => {
        if (updatedUser) {
          console.log('Zaktualizowano wynik użytkownika:', updatedUser);
          res.sendStatus(200);
        } else {
          console.log('Nie zaktualizowano wyniku użytkownika, ponieważ nowy wynik jest mniejszy lub równy aktualnemu.');
          res.sendStatus(200);
        }
      })
      .catch(err => {
        console.error('Wystąpił błąd podczas obsługi zapytania:', err);
        res.status(500).json({ error: 'Wystąpił błąd podczas obsługi zapytania.' });
      });
  });
  

app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
