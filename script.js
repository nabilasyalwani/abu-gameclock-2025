let interval;
let input_detik = 120; // Default time
let detikInput = ""; // Default untuk display
let possession = "Blue"; // Default possession
let running = false;
let clock = 0;
let shotclock = 20; // Default shot clock

function updateTimerDisplay(id, time) {
  const timer = document.getElementById(id);
  if (timer) {
    timer.textContent = time.toString();
  }
  console.log(`Timer updated: ${time} seconds`);
}

function updateTimer(timer) {
  clock = timer;
  console.log("shotclock set to:", shotclock);
  if (running) return;
  running = true;
  interval = setInterval(() => {
    if (clock > 0 && shotclock > 0) {
      clock--;
      shotclock--;
      updateTimerDisplay("detik-display", clock);
    } else {
      clearInterval(interval);
      console.log("Shot clock expired, changing possession.");
      changePossession(possession === "Blue" ? "Red" : "Blue");
      running = false;
    }
  }, 1000);
}

function onStartButtonClick() {
  if (running) return;
  const input = document.getElementById("detik-display").textContent;
  const value = parseInt(input, 10) || 0;
  input_detik = value;
  shotclock = input_detik > 20 ? 20 : input_detik;
  updateTimer(input_detik);
  console.log("Timer started with " + input_detik + " seconds.");
  const turns = generateTurns(input_detik, 20, ["Blue", "Red"]);
  renderTurns(turns);
}

function onStopButtonClick() {
  if (!running) return;
  clearInterval(interval);
  possession = possession === "Blue" ? "Red" : "Blue"; // Change possession
  setActiveTeam();
  const turns = generateTurns(clock, 20, ["Blue", "Red"]);
  renderTurns(turns);
  running = false;
  console.log("Clock stopped and reset at " + clock + " seconds.");
}

function changePossession(possessionTeam) {
  if (running) {
    clearInterval(interval);
    running = false;
  }
  possession = possessionTeam;
  const turns = generateTurns(clock, 20, ["Blue", "Red"]);
  renderTurns(turns);
  setActiveTeam();
  console.log(`Possession changed to ${possession}`);
}

function generateTurns(
  totalSeconds,
  turnDuration = 20,
  teams = ["Blue", "Red"]
) {
  const turns = [];
  let remaining = totalSeconds;
  let teamIndex = possession === "Blue" ? 0 : 1;
  let turnNumber = 1;

  while (remaining > 0) {
    const duration = remaining >= turnDuration ? turnDuration : remaining;
    turns.push({
      turn: turnNumber,
      team: teams[teamIndex % teams.length],
      duration: duration,
    });
    remaining -= duration;
    teamIndex++;
    turnNumber++;
  }
  return turns;
}

function renderTurns(turns) {
  const container = document.getElementById("turns-container");
  container.innerHTML = "";
  const template = document.getElementById("turn-template");
  turns.forEach((t) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".card");
    if (t.team.toLowerCase() === "blue") {
      card.classList.add("blue");
    } else if (t.team.toLowerCase() === "red") {
      card.classList.add("red");
    }
    clone.querySelector(".turn-number").textContent = t.turn;
    clone.querySelector(".turn-team").textContent = t.team;
    clone.querySelector(".turn-time").textContent = t.duration;
    clone.querySelector(".turn-team").classList.add(t.team.toLowerCase());
    container.appendChild(clone);
  });
}

function openModalDetik() {
  detikInput = "";
  document.getElementById("input-detik-display").textContent = "0";
  document.getElementById("modal-detik").style.display = "flex";
}

function closeModalDetik() {
  document.getElementById("modal-detik").style.display = "none";
}

function appendDetik(num) {
  if (detikInput.length < 3) {
    if (detikInput === "0") detikInput = "";
    detikInput += num;
    document.getElementById("input-detik-display").textContent =
      detikInput || "0";
  }
}

function clearDetik() {
  detikInput = "";
  document.getElementById("input-detik-display").textContent = "0";
}

function sendDetik() {
  document.getElementById("detik-display").textContent = detikInput || "0";
  const value = parseInt(detikInput, 10) || 0;
  input_detik = value;
  shotclock = input_detik > 20 ? 20 : input_detik;
  updateTimer(input_detik);
  console.log("Timer started with " + input_detik + " seconds.");
  closeModalDetik();
  const turns = generateTurns(input_detik, 20, ["Blue", "Red"]);
  renderTurns(turns);
  setActiveTeam();
}

function setActiveTeam() {
  document
    .querySelector(".red")
    .classList.toggle("inactive", possession !== "Red");
  document
    .querySelector(".blue")
    .classList.toggle("inactive", possession !== "Blue");
  document
    .querySelector(".red")
    .classList.toggle("active", possession === "Red");
  document
    .querySelector(".blue")
    .classList.toggle("active", possession === "Blue");
}
