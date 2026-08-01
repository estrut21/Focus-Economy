// 1. Find the HTML elements
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const coinBalance = document.getElementById('coinBalance');
const coinsInJar = document.getElementById('coinsInJar');

// 2. Set up the timer and coin balance
const startingTime = 25 * 60;
let timeRemaining = startingTime;
let timer = null;
let coins = Number(localStorage.getItem('coins')) || 0;
let completedSessions = Number(localStorage.getItem('completedSessions')) || 0;

// 3. Update what the user sees
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedSeconds = String(seconds).padStart(2, '0');
    const currentTime = `${minutes}:${formattedSeconds}`;

    timerDisplay.textContent = currentTime;
    document.title = `${currentTime} | Focus Economy`;
}

function updateCoinBalance() {
    coinBalance.textContent = `${coins} Coins`;
    localStorage.setItem('coins', coins);
}

function updateButtons(isRunning) {
    startButton.disabled = isRunning;
    pauseButton.disabled = !isRunning;
}

function addCoinToJar() {
    const coinImage = document.createElement('img');

    coinImage.src = 'assets/asset1.jpg';
    coinImage.alt = 'Earned coin';
    coinImage.classList.add('coinImage');

    coinsInJar.appendChild(coinImage);
}

function showCoinsInJar() {
    coinsInJar.innerHTML = '';

    for (let i = 0; i < completedSessions; i++) {
        addCoinToJar();
    }
}

// 4. Start the timer
function startTimer() {
    if (timer) {
        return;
    }

    updateButtons(true);

    timer = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            completeSession();
        }
    }, 1000);
}

// 5. Pause the timer
function pauseTimer() {
    clearInterval(timer);
    timer = null;
    updateButtons(false);
}

// 6. Reset the timer
function resetTimer() {
    pauseTimer();
    timeRemaining = startingTime;
    updateTimerDisplay();
}

// 7. Reward the user after a completed session
function completeSession() {
    pauseTimer();

    coins += 10;
    completedSessions++;

    localStorage.setItem('completedSessions', completedSessions);

    updateCoinBalance();
    showCoinsInJar();

    timeRemaining = startingTime;
    updateTimerDisplay();

    alert('Session complete! You earned 10 coins!');
}

// 8. Make the buttons respond to clicks
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// 9. Show the starting values when the page loads
updateTimerDisplay();
updateCoinBalance();
showCoinsInJar();
updateButtons(false);
