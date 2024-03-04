var duration = 90 * 60; // 90 minutes in seconds
var countingUp = false;
var timerInterval;

function updateTimer() {
  var minutes = Math.floor(duration / 60);
  var seconds = duration % 60;

  document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (duration > 15 * 60) {
    document.getElementById('timer').style.color = '#2ecc71'; // Green color
    document.getElementById('status').innerText = 'Changeover on Time';
    document.getElementById('status').style.color = '#2ecc71'; // Green color
    document.getElementById('timer').style.animation = 'none'; // Remove blinking animation
  } else if (duration > 0 && !countingUp) {
    document.getElementById('timer').style.color = '#e67e22'; // Orange color
    document.getElementById('status').innerText = 'Warning: Time running out!';
    document.getElementById('status').style.color = '#e67e22'; // Orange color
    document.getElementById('timer').style.animation = 'blink 1s infinite'; // Add blinking animation
  } else {
    document.getElementById('timer').style.color = '#e74c3c'; // Red color
    document.getElementById('status').innerText = 'Changeover duration exceeded';
    document.getElementById('status').style.color = '#e74c3c'; // Red color
    document.getElementById('timer').style.animation = 'none'; // Remove blinking animation
  }
}

function countdown() {
  if (duration > 0 && !countingUp) {
    duration--;
    updateTimer();
  } else if (duration === 0 && !countingUp) {
    countingUp = true;
    updateTimer();
  }
}

function countup() {
  if (countingUp) {
    duration++;
    updateTimer();
  }
}

function fastForward(minutes) {
  if (!countingUp) {
    duration -= minutes * 60;
    updateTimer();
  }
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      if (!countingUp) {
        countdown();
      } else {
        countup();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  duration = 90 * 60; // Reset the duration to the initial value
  countingUp = false;
  updateTimer();
}

// Initialize the timer
updateTimer();
