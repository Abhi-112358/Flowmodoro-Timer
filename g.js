// Initialize the timer variables
let timerRunning = false;
let timer;
let currminutes = 0;
let currseconds = 0;
let rest = false;
let breakTime = 0;


// Play the ringing sound when the timer reaches 0
function playRingingSound() {
  const audio = document.getElementById("ringing-sound");
  audio.play();
}


// Update the timer
function updateTimer(minutes, seconds) {
  // Increment the seconds
  seconds++;

  // If the seconds reach 60, increment the minutes and reset the seconds
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }

  // Return the updated time
  return { minutes, seconds };
}

function updateBreak(minutes, seconds) {
    // Decrement the seconds
    seconds--;

    // If the minutes reach 0, stop the timer
    if (minutes == 0 && seconds == 0) {
      clearInterval(timer);
      timerRunning = false;
      rest = false;
    }

    if (seconds < 60) {
      document.body.style.backgroundColor = "red";
    }

     // If the seconds reach 0, decrement the minutes and reset the seconds
     if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      if (minutes == 0 && seconds == 0) {
        playRingingSound();
      }   
  
    // Return the updated time
    return { minutes, seconds };
}

// Start the timer UI
function startTimerUI(minutes, seconds) {
  // Start the timer
  timer = setInterval(() => {
    // Update the timer
    let updatedTime;
    if (rest) {
      updatedTime = updateBreak(minutes, seconds);
    } else {
      updatedTime = updateTimer(minutes, seconds);
    }
    currminutes = minutes = updatedTime.minutes;
    currseconds = seconds = updatedTime.seconds;

    // Update the timer display
    document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
    document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
  }, 1000);
  timerRunning = true;
}

// Stop the timer UI
function pauseTimerUI() {
  // If the timer is running, stop it
  if (timerRunning) {
    clearInterval(timer);
    timerRunning = false;
  }
} 

// Stop the timer UI
function stopTimerUI() {
  if (!rest) {
    // Calculate the break time
    pauseTimerUI();
    let time = currminutes * 60 + currseconds;
    console.log(currseconds)
    breakTime = Math.round(time / 5);
    currminutes = Math.round(breakTime / 60);
    currseconds = breakTime % 60;
    // Set the rest flag to true
    rest = true;
    
  } else {
    // Reset the rest flag to false
    rest = false;

    // Reset the timer UI
    resetTimerUI();
  }
  document.body.style.backgroundColor = ""
}

// Reset the timer UI
function resetTimerUI() {
  // Stop the timer if it is running
  pauseTimerUI();

  // Reset the timer variables
  if (!rest) {
    currminutes = 0;
    currseconds = 0;
  } else {
    currminutes = Math.round(breakTime / 60);
    currseconds = breakTime % 60;
  }

  // Update the timer display
  document.getElementById("minutes").innerHTML = ("0" + currminutes).slice(-2);
  document.getElementById("seconds").innerHTML = ("0" + currseconds).slice(-2);

}

  // Attach event listeners to the buttons
  document.getElementById("start-button").addEventListener("click", () => {
    startTimerUI(currminutes, currseconds);
  });
  document.getElementById("stop-button").addEventListener("click", stopTimerUI);
  document.getElementById("reset-button").addEventListener("click", resetTimerUI);
  document.getElementById("pause-button").addEventListener("click", pauseTimerUI)