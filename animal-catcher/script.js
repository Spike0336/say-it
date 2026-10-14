// =====================================================
// Cute Catcher - Local cartoon images edition
// One character at a time • Local images • Slow display
// =====================================================

// All characters from the provided images
const CHARACTERS = [
  "ant", "bee", "bike", "bird", "boat", "bread", "bus", "car", "cat",
  "chair", "cow", "dog", "dolphin", "fish", "fly", "fork", "fox", "frog",
  "helicopter", "hippo", "horse", "kettle", "knife", "mug", "pig", "plane",
  "plate", "rain", "shark", "shirt", "shoe", "shorts", "skunk", "snail",
  "sock", "spider", "spoon", "toast", "tree", "wasp", "water", "whale"
];

// ========== GAME STATE ==========
let score = 0;
let caughtCount = 0;
let uniqueCaught = new Set();
let level = 1;
let isPlaying = false;
let isPaused = false;
let voiceEnabled = true;
let currentCharacter = null;
let holes = [];
let animationId = null;
let lastSpawn = 0;
let netX = 0;
let netY = 0;
let isNetActive = false;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const playArea = document.getElementById("play-area");
const net = document.getElementById("net");
const catchMessage = document.getElementById("catch-message");
const scoreEl = document.getElementById("score");
const caughtEl = document.getElementById("caught-count");
const uniqueEl = document.getElementById("unique-count");
const levelEl = document.getElementById("level");
const muteBtn = document.getElementById("mute-btn");
const pauseBtn = document.getElementById("pause-btn");
const pauseOverlay = document.getElementById("pause-overlay");

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("resume-btn").addEventListener("click", resumeGame);
document.getElementById("restart-btn").addEventListener("click", () => {
  pauseOverlay.classList.add("hidden");
  restartGame();
});
muteBtn.addEventListener("click", toggleVoice);
pauseBtn.addEventListener("click", pauseGame);

playArea.addEventListener("pointermove", onPointerMove);
playArea.addEventListener("pointerdown", onPointerDown);
playArea.addEventListener("pointerup", onPointerUp);
playArea.addEventListener("pointerleave", () => {
  isNetActive = false;
  net.classList.remove("active");
});

document.body.addEventListener("touchmove", (e) => {
  if (isPlaying) e.preventDefault();
}, { passive: false });

function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  isPlaying = true;
  isPaused = false;
  score = 0;
  caughtCount = 0;
  uniqueCaught.clear();
  level = 1;
  currentCharacter = null;
  updateHUD();

  playArea.querySelectorAll(".hole, .animal").forEach(el => el.remove());
  createHoles();

  const rect = playArea.getBoundingClientRect();
  netX = rect.width / 2;
  netY = rect.height / 2;
  updateNetPosition();

  lastSpawn = performance.now();
  requestAnimationFrame(gameLoop);
  setTimeout(() => spawnCharacter(), 800);
}

function restartGame() {
  if (currentCharacter) {
    if (currentCharacter.hideTimer) clearTimeout(currentCharacter.hideTimer);
    if (currentCharacter.el) currentCharacter.el.remove();
  }
  currentCharacter = null;
  startGame();
}

function pauseGame() {
  if (!isPlaying) return;
  isPaused = true;
  pauseOverlay.classList.remove("hidden");
  cancelAnimationFrame(animationId);
}

function resumeGame() {
  isPaused = false;
  pauseOverlay.classList.add("hidden");
  lastSpawn = performance.now();
  requestAnimationFrame(gameLoop);
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  muteBtn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
}

function createHoles() {
  holes = [];
  const areaW = playArea.clientWidth;
  const areaH = playArea.clientHeight;
  const cols = 3, rows = 2;
  const marginX = areaW * 0.15;
  const marginY = areaH * 0.28;
  const usableW = areaW - marginX * 2;
  const usableH = areaH - marginY - areaH * 0.12;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = marginX + (usableW / (cols - 1)) * c;
      const y = marginY + (usableH / (rows - 1)) * r;
      const holeEl = document.createElement("div");
      holeEl.className = "hole";
      holeEl.style.left = x + "px";
      holeEl.style.top = y + "px";
      playArea.appendChild(holeEl);
      holes.push({ x, y, el: holeEl, occupied: false });
    }
  }
}

function onPointerMove(e) {
  if (!isPlaying || isPaused) return;
  const rect = playArea.getBoundingClientRect();
  netX = e.clientX - rect.left;
  netY = e.clientY - rect.top;
  updateNetPosition();
}

function onPointerDown(e) {
  if (!isPlaying || isPaused) return;
  isNetActive = true;
  net.classList.add("active");
  tryCatch();
}

function onPointerUp() {
  isNetActive = false;
  net.classList.remove("active");
}

function updateNetPosition() {
  net.style.left = netX + "px";
  net.style.top = netY + "px";
}

function gameLoop(timestamp) {
  if (!isPlaying || isPaused) return;

  // Slow spawn rate so images have time to appear and be seen
  const gap = Math.max(1400, 2400 - level * 60);

  if (!currentCharacter && timestamp - lastSpawn > gap) {
    spawnCharacter();
    lastSpawn = timestamp;
  }
  if (isNetActive) tryCatch();
  animationId = requestAnimationFrame(gameLoop);
}

function spawnCharacter() {
  if (currentCharacter) return;
  const freeHoles = holes.filter(h => !h.occupied);
  if (freeHoles.length === 0) return;

  const hole = freeHoles[Math.floor(Math.random() * freeHoles.length)];
  hole.occupied = true;

  const name = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  const size = 160;

  const el = document.createElement("div");
  el.className = "animal popping";
  el.style.width = size + "px";
  el.style.height = size + "px";

  // Local image
  const img = document.createElement("img");
  img.src = `images/${name}.jpeg`;
  img.alt = name;
  img.draggable = false;
  img.loading = "eager";
  img.onerror = function() {
    el.innerHTML = "";
    el.textContent = name;
    el.style.fontSize = "1rem";
    el.style.fontWeight = "bold";
    el.style.color = "#3e2723";
    el.style.background = "#fff9c4";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.textAlign = "center";
    el.style.padding = "8px";
  };
  el.appendChild(img);

  el.style.left = (hole.x - size / 2) + "px";
  el.style.top = (hole.y - size / 2 - 18) + "px";
  playArea.appendChild(el);

  // Longer display time so the cute pictures can fully render and be enjoyed
  const stayTime = Math.max(1800, 2800 - level * 50) + Math.random() * 400;

  const character = { name, el, hole, size, caught: false, hideTimer: null };

  setTimeout(() => {
    if (!character.caught) {
      el.classList.remove("popping");
      el.classList.add("visible");
    }
  }, 200);

  character.hideTimer = setTimeout(() => {
    if (!character.caught) hideCharacter(character);
  }, stayTime);

  currentCharacter = character;

  el.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!character.caught) catchCharacter(character);
  });
}

function hideCharacter(character) {
  if (character.caught || !character.el) return;
  character.el.classList.remove("visible", "popping");
  character.el.classList.add("hiding");
  setTimeout(() => {
    if (character.el && character.el.parentNode) character.el.remove();
    character.hole.occupied = false;
    if (currentCharacter === character) currentCharacter = null;
    lastSpawn = performance.now();
  }, 280);
}

function tryCatch() {
  if (!currentCharacter || currentCharacter.caught) return;
  const netRadius = isNetActive ? 75 : 65;
  const dist = Math.hypot(currentCharacter.hole.x - netX, currentCharacter.hole.y - netY);
  if (dist < netRadius + currentCharacter.size * 0.4) {
    catchCharacter(currentCharacter);
  }
}

function catchCharacter(character) {
  if (character.caught) return;
  character.caught = true;
  if (character.hideTimer) clearTimeout(character.hideTimer);

  character.el.classList.remove("popping", "visible", "hiding");
  character.el.classList.add("caught");

  createBigConfetti(character.hole.x, character.hole.y);

  score += 15 + level * 3;
  caughtCount++;
  uniqueCaught.add(character.name);
  if (caughtCount % 8 === 0) level++;

  updateHUD();
  showBigCelebration(character.name);
  speakCatch(character.name);
  playFanfare();

  setTimeout(() => {
    if (character.el && character.el.parentNode) character.el.remove();
    character.hole.occupied = false;
    currentCharacter = null;
    lastSpawn = performance.now();
  }, 600);
}

function showBigCelebration(name) {
  catchMessage.innerHTML = `
    <div class="celebrate-title">🎉 You caught a ${name}! 🎉</div>
    <div class="celebrate-sub">Great job!</div>
  `;
  catchMessage.classList.remove("hidden");
  catchMessage.classList.add("big-celebrate");
  catchMessage.style.animation = "none";
  catchMessage.offsetHeight;
  catchMessage.style.animation = null;
  setTimeout(() => {
    catchMessage.classList.add("hidden");
    catchMessage.classList.remove("big-celebrate");
  }, 2400);
}

function speakCatch(name) {
  if (!voiceEnabled || !window.speechSynthesis) return;
  speechSynthesis.cancel();
  const phrases = [
    `I'm a ${name}. You caught me!`,
    `I'm a ${name}! You caught me!`,
    `You got me! I'm a ${name}!`,
    `I'm a ${name}. Nice catch!`
  ];
  const utter = new SpeechSynthesisUtterance(phrases[Math.floor(Math.random() * phrases.length)]);
  utter.rate = 0.92;
  utter.pitch = 1.1;
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Female"))) || voices.find(v => v.lang.startsWith("en"));
  if (preferred) utter.voice = preferred;
  speechSynthesis.speak(utter);
}

function playFanfare() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02 + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3 + i * 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + 0.35 + i * 0.09);
    });
  } catch (e) {}
}

function createBigConfetti(x, y) {
  const colors = ["#ffeb3b", "#ff9800", "#e91e63", "#2196f3", "#4caf50", "#9c27b0", "#00bcd4"];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement("div");
    p.className = "confetti";
    const size = 8 + Math.random() * 8;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = Math.random() > 0.4 ? "50%" : "2px";
    const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.4;
    const dist = 50 + Math.random() * 100;
    p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--ty", (Math.sin(angle) * dist - 30) + "px");
    p.style.setProperty("--rot", (Math.random() * 600 - 300) + "deg");
    playArea.appendChild(p);
    setTimeout(() => p.remove(), 950);
  }
}

function updateHUD() {
  scoreEl.textContent = score;
  caughtEl.textContent = caughtCount;
  uniqueEl.textContent = uniqueCaught.size;
  levelEl.textContent = level;
}

if (window.speechSynthesis) {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}
