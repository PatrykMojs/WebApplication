const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

let score = 0;
let gameFrame = 0;
ctx.font = '40 px Georgia';
let gameSpeed = 2;
let gameOver = false;
let paused = false;
let particleArray = [];
let adjustX = 15;
let adjustY = 10;
let czas = 0;

const mouse = {
    x: null,
    y: null,
    radius: 150,
    up: false,
    down: false,
    left: false,
    right: false
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('KRECIK', 20, 32);
const textCoordinates = ctx.getImageData(0, 0, 200, 200);

let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, '#FF00FF');
gradient.addColorStop(1, '#FFA500');
ctx.fillStyle = gradient;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.dentisty = (Math.random() * 40) + 5;
    }

    draw() {
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.dentisty;
        let directionY = forceDirectionY * force * this.dentisty;
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 5, positionY * 10));
            }
        }
    }
}

init();

document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
        player.up = true;
    }
    if (event.key === 's') {
        player.down = true;
    }
    if (event.key === 'a') {
        player.left = true;
    }
    if (event.key === 'd') {
        player.right = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'w') {
        player.up = false;
    }
    if (event.key === 's') {
        player.down = false;
    }
    if (event.key === 'a') {
        player.left = false;
    }
    if (event.key === 'd') {
        player.right = false;
    }
});


const backgroundMusic = document.createElement('audio');
backgroundMusic.loop = true; // odtwarzaj w pętli
backgroundMusic.src = 'SOUNDS/krecik.mp3';
backgroundMusic.loop = true; // odtwarzaj w pętlisad
backgroundMusic.play(); // rozpocznij odtwarzanie

if (gameOver || paused) {
    backgroundMusic.pause(); // zatrzymaj odtwarzanie
}

//player
const playerLeft = new Image();
playerLeft.src = 'IMAGES/krecik/krecik_left.png';

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 439;
        this.spriteHeight = 569;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    update() {
        if (this.up && this.y > 0) {
            this.y -= 5;
        }
        if (this.down && this.y < canvas.height - this.radius) {
            this.y += 5;
        }
        if (this.left && this.x > 0) {
            this.x -= 5;
        }
        if (this.right && this.x < canvas.width - this.radius) {
            this.x += 5;
        }
    }

    draw() {
        if (mouse.click) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.left) {
            this.angle = -0.5; // Obrót w lewo
        } else if (this.right) {
            this.angle = 0.5; // Obrót w prawo
        } else if (this.down) {
            this.angle = 3; // Obrót w dół
        } else {
            this.angle = 0; // Brak obrótów
        }
        ctx.rotate(this.angle);

        if (this.x >= mouse.x) {
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, 0 - 55, 0 - 75, this.spriteWidth / 4, this.spriteHeight / 4);
        }
        else {
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, 0 - 55, 0 - 75, this.spriteWidth / 4, this.spriteHeight / 4);
        }
        ctx.restore();
    }
}

const player = new Player();


//owoce
const frutiesArray = [];
const imagesArray = [
    'IMAGES/owoce/strawberry.png',
    'IMAGES/owoce/banana.png',
    'IMAGES/owoce/black-berry-dark.png',
    'IMAGES/owoce/green-apple.png',
    'IMAGES/owoce/orange.png',
    'IMAGES/owoce/red-cherry.png'
];

class Fruties {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = 'sound1';
        this.paused = false;
        const randomImageIndex = Math.floor(Math.random() * imagesArray.length);
        this.image = new Image();
        this.image.src = imagesArray[randomImageIndex];
    }

    update() {
        if (!this.paused) {
            this.y -= this.speed;
        }
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw() {
        ctx.drawImage(this.image, this.x - 50, this.y - 50, this.radius * 2, this.radius * 2);
    }
}

const frutiesPop = document.createElement('audio');
frutiesPop.src = 'SOUNDS/apple_bite.ogg';

function handleFruties() {
    if (!gameOver && !paused && gameFrame % 50 == 0) {
        frutiesArray.push(new Fruties());
    }

    for (let i = 0; i < frutiesArray.length; i++) {
        if (!frutiesArray[i].paused && !paused) {
            frutiesArray[i].update();
        }
        frutiesArray[i].draw();

        if (frutiesArray[i].y < 0 - frutiesArray[i].radius * 2) {
            frutiesArray.splice(i, 1)
            i--;
        }

        else if (frutiesArray[i].distance < frutiesArray[i].radius + player.radius) {
            if (!frutiesArray[i].counted) {
                if (frutiesArray[i].sound == 'sound1') {
                    frutiesPop.play();
                }

                score++;
                frutiesArray[i].counted = true;
                frutiesArray.splice(i, 1);
                i--;
            }
        }
    }

    for (let i = 0; i < frutiesArray.length; i++) {

    }
}

//donaty
const donatsArray = [];
const donatsimagesArray = [
    'IMAGES/donats/blue_icing.png',
    'IMAGES/donats/chocolate_icing_chocolate_drizzle.png',
    'IMAGES/donats/red_icing_white_sprinkles.png',
    'IMAGES/donats/white_icing.png',
    'IMAGES/donats/yellow_icing_chocolate_drizzle.png'
];

class Donats {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 5;
        this.distance;
        this.counted = false;
        this.sound = 'sound2';
        this.paused = false;
        const randomImageIndex = Math.floor(Math.random() * donatsimagesArray.length);
        this.image = new Image();
        this.image.src = donatsimagesArray[randomImageIndex];
    }

    update() {
        if (!this.paused) {
            this.y -= this.speed;
        }
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw() {
        ctx.drawImage(this.image, this.x - 50, this.y - 50, this.radius * 2, this.radius * 2);
    }
}

const donatsPop1 = document.createElement('audio');
donatsPop1.src = 'SOUNDS/donat.mp3';

function handleDonats() {
    if (!gameOver && !paused && gameFrame % 350 == 0) {
        donatsArray.push(new Donats());
    }

    for (let i = 0; i < donatsArray.length; i++) {
        if (!donatsArray[i].paused && !paused) {
            donatsArray[i].update();
        }

        donatsArray[i].draw();

        if (donatsArray[i].y < 0 - donatsArray.radius * 2) {
            donatsArray.splice(i, 1)
            i--;
        }
        else if (donatsArray[i].distance < donatsArray[i].radius + player.radius) {
            if (!donatsArray[i].counted) {
                if (donatsArray[i].sound == 'sound2') {
                    donatsPop1.play();
                }
                score = score + 5;
                donatsArray[i].counted = true;
                donatsArray.splice(i, 1);
                i--;
            }
        }
    }

    for (let i = 0; i < donatsArray.length; i++) {
    }
}

//kupy
const kupaArray = [];
const kupaimagesArray = [
    'IMAGES/kupa/kupa3.png',
    'IMAGES/kupa/kupa4.png'
];

class Kupa {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 2 + 2;
        this.distance;
        this.counted = false;
        this.sound = 'sound3';
        this.paused = false;
        const randomImageIndex = Math.floor(Math.random() * kupaimagesArray.length);
        this.image = new Image();
        this.image.src = kupaimagesArray[randomImageIndex];
    }

    update() {
        if (!this.paused) {
            this.y -= this.speed;
        }
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw() {
        ctx.drawImage(this.image, this.x - 50, this.y - 55, this.radius * 2, this.radius * 2);
    }
}

const kupaPop1 = document.createElement('audio');
kupaPop1.src = 'SOUNDS/kupa.mp3';

function handleKupa() {
    if (!gameOver && !paused && gameFrame % 250 == 0) {
        kupaArray.push(new Kupa());
    }

    for (let i = 0; i < kupaArray.length; i++) {
        if (!kupaArray[i].paused && !paused) {
            kupaArray[i].update();
        }

        kupaArray[i].draw();

        if (kupaArray[i].y < 0 - kupaArray.radius * 2) {
            kupaArray.splice(i, 1)
            i--;
        }
        else if (kupaArray[i].distance < kupaArray[i].radius + player.radius) {
            if (!kupaArray[i].counted) {
                if (kupaArray[i].sound == 'sound3') {
                    kupaPop1.play();
                }
                score = score - 3;
                kupaArray[i].counted = true;
                kupaArray.splice(i, 1);
                i--;
            }
        }
    }

    for (let i = 0; i < donatsArray.length; i++) {
    }
}

//enemy
// const enemyImage = new Image();
// enemyImage.src = 'IMAGES/enemies/baba.png';
const enemyArray = [];
const enemyimagesArray = [
    'IMAGES/enemies/baba.png',
    'IMAGES/enemies/dziad2.png'
];

const enemyPop = document.createElement('audio');
enemyPop.src = 'SOUNDS/gameover.mp3';

class Enemy {
    constructor() {
        this.x = canvas.width / 2000000;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 452;
        this.spriteHeight = 552;
        this.paused = false;
        this.originalSpeed = this.speed;
        this.sound = 'sound4';

        const randomImageIndex = Math.floor(Math.random() * enemyimagesArray.length);
        this.image = new Image();
        this.image.src = enemyimagesArray[randomImageIndex];
    }

    update() {
        if (!this.paused) {
            this.x -= this.speed;
        }
        if (this.x < 0 - this.radius * 2) {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
        if (paused) {
            this.speed = 0; //dodana linijka, ustawienie prędkości na 0 podczas pauzy
        }
        else {
            this.speed = this.originalSpeed; // Dodana linijka, przywrócenie pierwotnej prędkości
        }

        const dx = this.x - player.x;
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + player.radius) {
            handleGameOver();
            enemyPop.play();
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x - 55, this.y - 70, this.spriteWidth / 4, this.spriteHeight / 4);
    }
}

const enemy1 = new Enemy();
function handleEnemies() {
    if (!gameOver && !paused && gameFrame % 1500 === 0) {
        enemyArray.push(new Enemy());
    }

    for (let i = 0; i < enemyArray.length; i++) {
        enemyArray[i].draw();
        enemyArray[i].update();
    }
}

//background
const background = new Image();
background.src = 'IMAGES/background/tlo.jpg';

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,
};

function handleBackground() {
    BG.x1 -= gameSpeed;
    BG.x2 -= gameSpeed;

    if (BG.x1 <= -BG.width) {
        BG.x1 = BG.width;
    }

    if (BG.x2 <= -BG.width) {
        BG.x2 = BG.width;
    }

    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function handleGameOver() {
    const img = new Image();
    img.src = 'IMAGES/background/tlo.jpg';
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Przegrałeś, dałeś się złapać.', canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText('Liczba zjedzonych owoców wynosi: ' + score, canvas.width / 2, canvas.height / 2 + 70);
        ctx.fillText('Twój czas: ' + czas + ' s', canvas.width / 2, canvas.height / 2 + 140);
        gameOver = true;
        backgroundMusic.pause();
        const smallImg = new Image();
        smallImg.src = 'IMAGES/enemies/dziad.png';
        smallImg.onload = function () {
            const smallImgSize = 220;
            const smallImgX = canvas.width - smallImgSize - 10;
            const smallImgY = 10;
            ctx.drawImage(smallImg, smallImgX, smallImgY, smallImgSize, smallImgSize);
        }

        const small2Img = new Image();
        small2Img.src = 'IMAGES/enemies/biedra.png';
        small2Img.onload = function () {
            const small2ImgSize = 80;
            const small2ImgX = canvas.width - small2ImgSize - 400;
            const small2ImgY = 260;
            ctx.drawImage(small2Img, small2ImgX, small2ImgY, small2ImgSize, small2ImgSize);
        }


        const small3Img = new Image();
        small3Img.src = 'IMAGES/enemies/mrowka_pchaj.png';
        small3Img.onload = function () {
            const small3ImgSize = 150;
            const small3ImgX = 680;
            const small3ImgY = canvas.width - small3ImgSize - 350;
            ctx.drawImage(small3Img, small3ImgX, small3ImgY, small3ImgSize, small3ImgSize);
        }


        const small4Img = new Image();
        small4Img.src = 'IMAGES/enemies/mrowka_tancz.png';
        small4Img.onload = function () {
            const small4ImgSize = 150;
            const small4ImgX = 80;
            const small4ImgY = canvas.width - small4ImgSize - 350;
            ctx.drawImage(small4Img, small4ImgX, small4ImgY, small4ImgSize, small4ImgSize);
        }


        const small5Img = new Image();
        small5Img.src = 'IMAGES/enemies/mrowka.png';
        small5Img.onload = function () {
            const small5ImgSize = 150;
            const small5ImgX = 80;
            const small5ImgY = canvas.width - small5ImgSize - 750;
            ctx.drawImage(small5Img, small5ImgX, small5ImgY, small5ImgSize, small5ImgSize);
        }
    };
    var userNick = getParameterByName("nick");
    var data = {
    nick: userNick,
    score: score
    };
    if(gameOver==true){
    axios.post('http://localhost:3001/submit-score', data)
        .then(function (response) {
            console.log('Dane zostały przesłane na serwer.');
        })
        .catch(function (error) {
            console.error('Wystąpił błąd podczas wysyłania danych na serwer: ' + error);
        });
        }
}

// Dodanie nasłuchiwania na kliknięcie przycisku "Nowa gra"
const newGameBtn = document.getElementById("new-game");
newGameBtn.addEventListener("click", function () {
    location.reload(); // wywołanie funkcji resetującej
});

const SCORE_X = 150;
const SCORE_Y = 50;
// Funkcja rysująca tekst "Zjedzone owoce" na stałej pozycji
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText('Zjedzone owoce: ' + score, SCORE_X, SCORE_Y);
}

//animacja
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    drawScore();
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Czas: ' + czas + ' s', canvas.width - 150, 50);

    handleFruties();
    handleDonats();
    handleKupa();
    player.update();
    player.draw();
    handleEnemies();
    gameFrame++;

    czas = Math.floor(gameFrame / 60);

    if (paused) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Pauza", canvas.width / 2, canvas.height / 2);
    } else if (!gameOver) {
        requestAnimationFrame(animate);
    }
}
animate();

function pauseGame() {
    paused = !paused;
    if (paused) {
        gameSpeed = 0;
        backgroundMusic.pause();
    } else {
        gameSpeed = 1;
        backgroundMusic.play();
        animate();
    }
}