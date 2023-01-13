// Initialize the timer variables

let timerRunning = false;
let timer;
let minutes = 0;
let seconds = 0;
let rest = false;
let breakTime = 0;

// Update the timer display
function updateTimer() {
  // Decrement the seconds
  seconds++;

  // If the seconds reach 0, decrement the minutes and reset the seconds
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }

  // If the minutes reach 0, stop the timer
  if (minutes < 0) {
    clearInterval(timer);
    timerRunning = false;
  }

  // Update the timer display
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

function updateBreak() {
    // Decrement the seconds
    seconds--;

    // If the seconds reach 0, decrement the minutes and reset the seconds
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }
  
    // If the minutes reach 0, stop the timer
    if (minutes == 0 && seconds == 0) {
      clearInterval(timer);
      timerRunning = false;
      rest = false;
    }
  
    // Update the timer display
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

// Start the timer
function startTimer() {
  // If the timer is not already running, start it
  if (!timerRunning) {
    if (rest) {
      startBreak(breakTime);
    }
    else {
    timer = setInterval(updateTimer, 1000);
    timerRunning = true;
    }
  }
}

// Stop the timer
function pauseTimer() {
  // If the timer is running, stop it
  if (timerRunning) {
    clearInterval(timer);
    timerRunning = false;
  }
}

function stopTimer() {
    if (!rest) {
    pauseTimer()
    let time = minutes * 60 + seconds;
    breakTime = Math.round(time / 5);
    

    rest = true;
    }

    else {
      rest = false
      resetTimer()
     

    }
}

// Reset the timer
function resetTimer() {
  
  // Stop the timer if it is running
  pauseTimer();

  // Reset the timer variables
  if (!rest) {
  minutes = 00;
  seconds = 00;
  }

  else {
    minutes = Math.round(breakTime / 60)
    seconds = time % 60
  
  }

  // Update the timer display
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

function pauseBreak() {
  pauseTimer();
}




function startBreak(time) {
    minutes = Math.round(time / 60)
    seconds = time % 60
    if (!timerRunning) {
      timer = setInterval(updateBreak, 1000);
      timerRunning = true;
    }
}

// Attach event listeners to the buttons

document.getElementById("start-button").addEventListener("click", startTimer);
document.getElementById("stop-button").addEventListener("click", stopTimer);
document.getElementById("reset-button").addEventListener("click", resetTimer);
document.getElementById("pause-button").addEventListener("click", pauseTimer)

