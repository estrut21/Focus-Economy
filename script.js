//1. find html elements
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const coinBalance = document.getElementById('coinBalance');

//2. timer info
const startingTime = 25 * 60; 
let timeRemaining = startingTime;
let timer;
let coins = 0;

//3. update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formmattedSeconds = string(seconds).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${formmattedSeconds}`;
}

//4. start timer
function startTimer() {
    if (!timer) {
        return;
    }
    timer =setInterval(function() {
        timeleft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            completeSession();
        }
    }, 1000);
}