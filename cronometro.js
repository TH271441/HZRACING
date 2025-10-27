// ========================================
// CRONÓMETRO HZ RACING
// ========================================

let globalTimerInterval;
let lapTimerInterval;
let globalTime = 0;
let lapTime = 0;
let lapCount = 0;
let fastestLapTime = null;

const startStopBtn = document.getElementById("startStopBtn");
const saveLapBtn = document.getElementById("saveLapBtn");
const resetLapBtn = document.getElementById("resetLapBtn");
const globalTimerDisplay = document.getElementById("globalTimer");
const lapTimerDisplay = document.getElementById("lapTimer");
const lapTable = document.getElementById("lapTable").getElementsByTagName("tbody")[0];
const fastestLapDisplay = document.getElementById("fastestLapTime");

startStopBtn.addEventListener("click", startStopTimer);
saveLapBtn.addEventListener("click", saveLap);
resetLapBtn.addEventListener("click", resetLap);

function startStopTimer() {
  if (startStopBtn.textContent === "Iniciar") {
    startStopBtn.textContent = "Detener";
    startGlobalTimer();
    startLapTimer();
    saveLapBtn.disabled = false;
    resetLapBtn.disabled = false;
  } else {
    startStopBtn.textContent = "Iniciar";
    stopGlobalTimer();
    stopLapTimer();
    saveLapBtn.disabled = true;
    resetLapBtn.disabled = true;
  }
}

function startGlobalTimer() {
  globalTimerInterval = setInterval(() => {
    globalTime += 10;
    globalTimerDisplay.textContent = formatTime(globalTime);
  }, 10);
}

function stopGlobalTimer() {
  clearInterval(globalTimerInterval);
}

function startLapTimer() {
  lapTime = 0;
  lapTimerInterval = setInterval(() => {
    lapTime += 10;
    lapTimerDisplay.textContent = formatTime(lapTime);
  }, 10);
}

function stopLapTimer() {
  clearInterval(lapTimerInterval);
}

function saveLap() {
  const lapTimeFormatted = formatTime(lapTime);
  const interval = calculateInterval(lapTime);
  const lapRow = lapTable.insertRow();
  const lapCell = lapRow.insertCell(0);
  const lapTimeCell = lapRow.insertCell(1);
  const intervalCell = lapRow.insertCell(2);

  lapCell.textContent = lapCount + 1;
  lapTimeCell.textContent = lapTimeFormatted;
  intervalCell.textContent = interval;
  intervalCell.classList.add('interval');

  if (lapTime < fastestLapTime || fastestLapTime === null) {
    fastestLapTime = lapTime;
    fastestLapDisplay.textContent = lapTimeFormatted;
    lapRow.classList.add("highlight");
  }

  lapCount++;
  resetLapTimer();
  scrollToBottom();
}

function resetLapTimer() {
  lapTime = 0;
  lapTimerDisplay.textContent = formatTime(lapTime);
}

function resetLap() {
  lapTime = 0;
  lapTimerDisplay.textContent = formatTime(lapTime);
}

function calculateInterval(currentLapTime) {
  if (fastestLapTime === null) return "+0:00.000";
  const interval = currentLapTime - fastestLapTime;
  return interval >= 0 ? `+${formatTime(interval)}` : `-${formatTime(Math.abs(interval))}`;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

function padZero(num, length = 2) {
  return num.toString().padStart(length, "0");
}

function scrollToBottom() {
  const tableWrapper = document.querySelector('.table-wrapper');
  tableWrapper.scrollTop = tableWrapper.scrollHeight;
}
