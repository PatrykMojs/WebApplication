const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors=require('cors');
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
    Nick: {type:String, unique : true, required:true},
    Login: {type:String, unique : true, required:true},
    Password:{type:String,required:true},
    Score:{type:Number, default:0},
    About:{type:String, default:"Cześć! Jestem nowym graczem Mole Escape"}
},{timestamps:true}
);

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Obsługa logowania użytkownika
app.post('/login', async (req, res) => {
    const { Login, Password } = req.body;
    console.log(Login,Password);
    try {
        // Sprawdź, czy istnieje użytkownik o podanym loginie
        const user = await User.findOne({ Login });
        console.log(user);
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

app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
