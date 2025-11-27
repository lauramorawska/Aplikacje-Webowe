let seconds = 0;
let interval = null;

function formatTime(sec) {
  const s = sec % 60;
  const min = Math.floor(sec / 60);

  const sFormatted = s < 10 ? `0${s}` : s;

  if (sec < 60) {
    return `${sFormatted}s`;
  }

  return `${min}min ${sFormatted}s`;
}

function updateTimer() {
  document.querySelector("#timer").textContent = formatTime(seconds);
}

document.querySelector("#start").onclick = () => {
  if (interval === null) {
    interval = setInterval(() => {
      seconds++;
      updateTimer();
    }, 1000);
  }
};

document.querySelector("#stop").onclick = () => {
  clearInterval(interval);
  interval = null;
};

document.querySelector("#reset").onclick = () => {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  updateTimer();
};

updateTimer();
