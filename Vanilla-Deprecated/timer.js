// Initialize the timer variables
let timerRunning = false;
let timer;
let currminutes = 0;
let currseconds = 0;
let rest = false;
let breakTime = 0;
let cycle = 0;
let pausecount = 0;
let roundTime = 0;

// Initialize an empty array to store session history
var sessionHistory = [];


// Check if there is already a session history in local storage
if (localStorage.getItem("sessionHistory")) {
  console.log("yes");
  sessionHistory = JSON.parse(localStorage.getItem("sessionHistory"));

}

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

     if (minutes == 0 && seconds < 10) {
      document.getElementById("timer").style.color = "red";
     }

     // If the seconds reach 0, decrement the minutes and reset the seconds
     if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      if (minutes == 0 && seconds == 0) {
        playRingingSound();
        document.getElementById("timer").style.color = "";
        document.getElementById("pause-button").style.display = "none";
        document.getElementById("start-button").style.display = "inline";
        document.getElementById("session-type").innerHTML = "Focus";
      }   
  
    // Return the updated time
    return { minutes, seconds };
}

// Start the timer UI
function startTimerUI(minutes, seconds) {
 
  console.log("#" + cycle);
  
  document.getElementById("pause-button").style.display = "inline";
  document.getElementById("start-button").style.display = "none";
  if (!rest && pausecount == 0) {
    cycle++;
    document.getElementById("cycle").innerHTML = "#" + String(cycle);
    
  }
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
  document.getElementById("pause-button").style.display = "none";
  document.getElementById("start-button").style.display = "inline";
  pausecount++;
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
    roundTime = currminutes * 60 + currseconds;
    if (roundTime < 3) {
      breakTime = 1;
    }
    else {
    breakTime = Math.round(roundTime / 5);
    }
    console.log(breakTime);
    currminutes = Math.round(breakTime / 60);
    currseconds = breakTime % 60;
    // Set the rest flag to true
    rest = true;
    document.getElementById("session-type").innerHTML = "Break";
    
    
  } else {
    // Reset the rest flag to false
    rest = false;
    document.getElementById("session-type").innerHTML = "Focus";

    // Reset the timer UI
    resetTimerUI();
  }
  pausecount = 0;
  
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
  // When the timer ends, add the current session to the history
  document.getElementById("stop-button").addEventListener("click", () => {
    
    if (rest) {
      
    
        console.log("me" + breakTime * 5);
      let currSession = {
        date: Date(),
        cycle: cycle,
        focusDuration: roundTime,
        breakDuration: breakTime,
      };
      sessionHistory.push(currSession);
      localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
      
    }
  });

  document.getElementById("reset-button").addEventListener("click", resetTimerUI);
  document.getElementById("pause-button").addEventListener("click", pauseTimerUI);

  
