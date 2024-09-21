const words = ["javascript", "hangman", "responsive", "development", "programming"];
let selectedWord;
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

// DOM elements
const wordContainer = document.getElementById("wordContainer");
const lettersContainer = document.getElementById("lettersContainer");
const hangmanCanvas = document.getElementById("hangmanCanvas");
const ctx = hangmanCanvas.getContext("2d");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

// Initialize Game
function initGame() {
    // Reset state
    guessedLetters = [];
    mistakes = 0;
    selectedWord = words[Math.floor(Math.random() * words.length)];

    statusMessage.textContent = "";
    restartButton.style.display = "none";

    drawHangman();
    displayWord();
    displayLetters();
}

// Display hidden word
function displayWord() {
    wordContainer.innerHTML = '';
    selectedWord.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.classList.add('letter');
        letterSpan.textContent = guessedLetters.includes(letter) ? letter : "_";
        wordContainer.appendChild(letterSpan);
    });

    const won = selectedWord.split('').every(letter => guessedLetters.includes(letter));
    if (won) {
        statusMessage.textContent = "You won!";
        endGame();
    }
}

// Display available letters
function displayLetters() {
    lettersContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement('button');
        button.classList.add('letter-button');
        button.textContent = letter;
        button.disabled = guessedLetters.includes(letter);
        button.addEventListener('click', () => handleGuess(letter));
        lettersContainer.appendChild(button);
    }
}

// Handle guessed letter
function handleGuess(letter) {
    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        displayWord();
    } else {
        mistakes++;
        drawHangman();
    }

    if (mistakes >= maxMistakes) {
        statusMessage.textContent = `Game over! The word was "${selectedWord}"`;
        endGame();
    }
}

// End game
function endGame() {
    lettersContainer.innerHTML = '';
    restartButton.style.display = 'inline-block';
}

// Draw Hangman
function drawHangman() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#333';

    // Draw base
    ctx.beginPath();
    ctx.moveTo(10, 230);
    ctx.lineTo(190, 230);
    ctx.stroke();

    // Draw parts based on mistakes
    if (mistakes > 0) {
        // Pole
        ctx.moveTo(50, 230);
        ctx.lineTo(50, 30);
        ctx.stroke();
    }
    if (mistakes > 1) {
        // Top bar
        ctx.lineTo(150, 30);
        ctx.stroke();
    }
    if (mistakes > 2) {
        // Rope
        ctx.moveTo(150, 30);
        ctx.lineTo(150, 50);
        ctx.stroke();
    }
    if (mistakes > 3) {
        // Head
        ctx.beginPath();
        ctx.arc(150, 70, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (mistakes > 4) {
        // Body
        ctx.moveTo(150, 90);
        ctx.lineTo(150, 160);
        ctx.stroke();
    }
    if (mistakes > 5) {
        // Arms
        ctx.moveTo(150, 120);
        ctx.lineTo(130, 140);
        ctx.moveTo(150, 120);
        ctx.lineTo(170, 140);
        ctx.stroke();
    }
    if (mistakes > 6) {
        // Legs
        ctx.moveTo(150, 160);
        ctx.lineTo(130, 200);
        ctx.moveTo(150, 160);
        ctx.lineTo(170, 200);
        ctx.stroke();
    }
}

// Restart the game
restartButton.addEventListener('click', initGame);

// Initialize the game for the first time
initGame();
