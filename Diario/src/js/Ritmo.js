const displayTime = document.getElementById("displayTime");
const displayState = document.getElementById("displayState");
const progress = document.getElementById("progress");

let startTime = null;
let endTime = null;
let timerInterval = null;

// Función para iniciar el ayuno
function startFast(hours) {
  if (timerInterval) clearInterval(timerInterval);

  startTime = Date.now();
  endTime = startTime + hours * 60 * 60 * 1000;

  displayState.textContent = "En ayuno...";
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Función para pausar
function pauseFast() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
  displayState.textContent = "Pausado";
}

// Función para terminar
function endFast() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  startTime = null;
  endTime = null;
  displayTime.textContent = "00:00:00";
  displayState.textContent = "No iniciado";
  progress.style.strokeDashoffset = progress.getTotalLength();
}

// Actualizar tiempo restante y progreso del círculo
function updateTimer() {
  const now = Date.now();
  const remaining = endTime - now;

  if (remaining <= 0) {
    endFast();
    displayState.textContent = "Ayuno completado ✅";
    return;
  }

  const hours = Math.floor(remaining / (1000*60*60));
  const minutes = Math.floor((remaining / (1000*60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  displayTime.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

  // Actualizar progreso
  const total = endTime - startTime;
  const progressValue = progress.getTotalLength() * (remaining / total);
  progress.style.strokeDashoffset = progressValue;
}

// Botones
document.getElementById("startBtn").addEventListener("click", ()=>startFast(16));
document.getElementById("pauseBtn").addEventListener("click", pauseFast);
document.getElementById("endBtn").addEventListener("click", endFast);

// Presets
document.querySelectorAll(".preset-list button").forEach(btn=>{
  btn.addEventListener("click", e=>{
    const hours = parseInt(e.currentTarget.dataset.length);
    startFast(hours);
  });
});

