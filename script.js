let interval1, interval2;
let time1 = 120;
let time2 = 20;
let running = false;
let scoreA = 0;
let scoreB = 0;

function updateTimerDisplay(id, time) {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  const timer = document.getElementById(id);
  if (timer) {
    const span = timer.querySelector("span");
    if (span) span.textContent = `${minutes}:${seconds}`;
  }
}

function startTimers() {
  if (running) return;
  running = true;

  interval1 = setInterval(() => {
    if (time1 > 0 && time2 > 0) {
      time1--;
      updateTimerDisplay("timer1", time1);
    } else {
      clearInterval(interval1);
      running = false;
    }
  }, 1000);

  interval2 = setInterval(() => {
    if (time2 > 0) {
      time2--;
      updateTimerDisplay("timer2", time2);
    } else {
      clearInterval(interval2);
      running = false;
    }
  }, 1000);
}

function pauseTimers() {
  clearInterval(interval1);
  clearInterval(interval2);
  running = false;
}

function stopTimers() {
  clearInterval(interval1);
  clearInterval(interval2);
  time1 = 120;
  time2 = 20;
  updateTimerDisplay("timer1", time1);
  updateTimerDisplay("timer2", time2);
  running = false;
}

function resetTimer1() {
  if (running) return;
  clearInterval(interval1);
  time1 = 120;
  updateTimerDisplay("timer1", time1);
}

function resetTimer2() {
  if (running) return;
  clearInterval(interval2);
  time2 = 20;
  updateTimerDisplay("timer2", time2);
}

function changeScore(team, points) {
  if (team === "A") {
    scoreA = Math.max(0, scoreA + points);
    const el = document.getElementById("scoreA");
    if (el) el.textContent = scoreA;
  } else if (team === "B") {
    scoreB = Math.max(0, scoreB + points);
    const el = document.getElementById("scoreB");
    if (el) el.textContent = scoreB;
  }
}

function resetScores() {
  scoreA = 0;
  scoreB = 0;
  const elA = document.getElementById("scoreA");
  const elB = document.getElementById("scoreB");
  if (elA) elA.textContent = scoreA;
  if (elB) elB.textContent = scoreB;
}
