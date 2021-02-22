const WORK_SESSION = 25 * 60; //convert 25 minutes to seconds
const SHORT_BREAK = 5 * 60; //convert 5 minutes to seconds
const LONG_BREAK = 15 * 60; //convert 15 minutes to seconds

let workSession = 'Work';
let shortBreak = 'Short Break';
let longBreak = 'Long Break';
let currSession = workSession;

let startButton = 'START';
let stopButton = 'STOP';
let yesButton = 'Yes';

const timerButton = document.getElementById('timer-button');
let timeDisplay = document.getElementById('time-display');
let sessionDisplay = document.getElementById('session-display');
let finishedTask = document.getElementById('task-finished');

myStorage = window.localStorage;
myStorage.pomodoros = 0; //save number of pomodoros completed

let countdown = undefined;

function timer(seconds) {
  displayTimeLeft(seconds); //fixes bug where initial time does not show
  sessionDisplay.textContent = currSession;

  countdown = setInterval(() => {
    seconds -= 1;

    if (seconds < 0) {
      clearInterval(countdown);

      if (currSession == workSession) {
        myStorage.pomodoros = parseInt(myStorage.pomodoros) + 1;
        document.getElementById('pom-completed').innerHTML =
          'Pomos completed: ' + myStorage.pomodoros;
      }
      updateSession();
      loopTimer();
      return;
    }

    displayTimeLeft(seconds);
  }, 1000);
}

function displayTimeLeft(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;

  const display = `${minutes < 10 ? '0' : ''}${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  timeDisplay.textContent = display;
  document.title = display; //set title of website with countdown
}

function startTimer() {
  if (timerButton.textContent == startButton) {
    sessionDisplay.innerText = currSession;
    timerButton.textContent = stopButton;

    timer(WORK_SESSION);
  } else if (timerButton.textContent == stopButton) {
    clearInterval(countdown);
    displayTimeLeft(WORK_SESSION);
    timerButton.textContent = startButton;
    currSession = workSession;
  } else if (timerButton.textContent == yesButton) {
    deleteTask();
    timerButton.disabled = true;
  }
}

function updateSession() {
  if (currSession == longBreak || currSession == shortBreak) {
    currSession = workSession;
    timerButton.textContent = stopButton;
    finishedTask.textContent = '';
  } else if (currSession == workSession) {
    if (
      parseInt(myStorage.pomodoros) % 4 == 0 &&
      parseInt(myStorage.pomodoros) != 0
    ) {
      currSession = longBreak;
      timerButton.textContent = yesButton;
      finishedTask.textContent = 'Did you complete your task?';
    } else {
      currSession = shortBreak;
      timerButton.textContent = yesButton;
      finishedTask.textContent = 'Did you complete your task?';
    }
  }
}

function loopTimer() {
  timerButton.disabled = false;

  if (currSession == workSession) {
    timer(WORK_SESSION);
  }
  if (currSession == longBreak) {
    timer(LONG_BREAK);
  }
  if (currSession == shortBreak) {
    timer(SHORT_BREAK);
  }
}

function deleteTask() {}

function resetPomodoroCount() {
  myStorage.pomodoros = 0;
}

timerButton.addEventListener('click', startTimer);

/*
<!-- HTML ADDED IF NEEDED TO TEST CODE -->

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Pomodoro-Timer</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
<div id="wrapper">
	<h2 id="time-display">25:00</h2>
  <p id="task-finished"></p>
	<button id="timer-button">START</button><br><br>
  <p id="session-display">Work</p>
  <p id="pom-completed"></p>

</div>
<script src="timer_new.js"></script>
</body>
</html>

 */