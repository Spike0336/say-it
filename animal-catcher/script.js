// =====================================================
// Animal Catcher - Real photos edition (fixed images)
// One animal at a time • Clear real pictures • Faster
// =====================================================

const ALL_ANIMALS = [
  "pig", "cow", "horse", "sheep", "goat", "chicken", "duck", "goose", "turkey", "donkey",
  "rabbit", "hamster", "mouse", "dog", "cat", "lion", "tiger", "elephant", "giraffe", "zebra",
  "hippopotamus", "rhinoceros", "bear", "panda", "koala", "kangaroo", "monkey", "gorilla",
  "chimpanzee", "orangutan", "deer", "fox", "wolf", "raccoon", "squirrel", "bat", "camel",
  "eagle", "owl", "penguin", "flamingo", "swan", "peacock", "snake", "lizard", "crocodile",
  "turtle", "frog", "fish", "shark", "whale", "dolphin", "octopus", "crab", "lobster",
  "butterfly", "bee", "ant", "spider", "snail"
];

const UNIQUE_ANIMALS = [...new Set(ALL_ANIMALS)];

// Correct Wikimedia Commons file names + official redirect URLs (reliable)
const ANIMAL_FILES = {
  "pig": "Sus_scrofa_domesticus,_domesticus.jpg",
  "cow": "Cow_female_black_white.jpg",
  "horse": "Dapple_grey_horse.jpg",
  "sheep": "Flock_of_sheep.jpg",
  "goat": "Hausziege_04.jpg",
  "chicken": "Female_and_male_chicken_sitting_together.jpg",
  "duck": "Anas_platyrhynchos_male_female.jpg",
  "goose": "Domestic_goose.jpg",
  "turkey": "Male_wild_turkey.jpg",
  "donkey": "Donkey_1.jpg",
  "rabbit": "Oryctolagus_cuniculus_Rcdo.jpg",
  "hamster": "Golden_Hamster.jpg",
  "mouse": "Mouse_white.jpg",
  "dog": "YellowLabradorLooking_new.jpg",
  "cat": "Cat03.jpg",
  "lion": "Lion_waiting_in_Namibia.jpg",
  "tiger": "Walking_tiger_female.jpg",
  "elephant": "African_Bush_Elephant.jpg",
  "giraffe": "Giraffe_Mikumi_National_Park.jpg",
  "zebra": "Equus_quagga_burchellii_-_Etosha,_2014.jpg",
  "hippopotamus": "Hippo_pod_edit.jpg",
  "rhinoceros": "White_rhino.jpg",
  "bear": "2010-kodiak-bear-1.jpg",
  "panda": "Grosser_Panda.JPG",
  "koala": "Koala_climbing_tree.jpg",
  "kangaroo": "Kangaroo_and_joey03.jpg",
  "monkey": "Vervet_monkey_(Chlorocebus_pygerythrus_pygerythrus).jpg",
  "gorilla": "Gorille_des_plaines_de_l'ouest_au_Zoo_de_la_Palmyre.jpg",
  "chimpanzee": "Schimpanse_Zoo_Leipzig.jpg",
  "orangutan": "Orang_Utan,_Semenggok_Forest_Reserve,_Sarawak,_Borneo,_Malaysia.JPG",
  "deer": "White-tailed_deer.jpg",
  "fox": "Fox_-_British_Wildlife_Centre_(17427893391).jpg",
  "wolf": "Kolmården_Wolf.jpg",
  "raccoon": "Raccoon_in_Central_Park_(2).jpg",
  "squirrel": "Eastern_Grey_Squirrel_I4.jpg",
  "bat": "Flying_fox_at_Botanic_Gardens.jpg",
  "camel": "07._Camel_Profile,_near_Silverton,_NSW,_07.07.2007.jpg",
  "eagle": "About_to_Launch_(cropped).jpg",
  "owl": "Great_Horned_Owl.jpg",
  "penguin": "Emperor_Penguin_Manchot_empereur.jpg",
  "flamingo": "Caribbean_flamingo.jpg",
  "swan": "Swan_on_Lake_Geneva.jpg",
  "peacock": "Peacock_Plumage.jpg",
  "snake": "Python_molurus_molurus_2.jpg",
  "lizard": "Emerald_Swift_Lizard.jpg",
  "crocodile": "Nile_crocodile_head.jpg",
  "turtle": "Turtle1.jpg",
  "frog": "Poison_dart_frog.jpg",
  "fish": "Goldfish_in_aquarium.jpg",
  "shark": "White_shark.jpg",
  "whale": "Humpback_Whale_underwater_shot.jpg",
  "dolphin": "Tursiops_truncatus_01.jpg",
  "octopus": "Octopus2.jpg",
  "crab": "Cancer_pagurus.jpg",
  "lobster": "Homarus_gammarus.jpg",
  "butterfly": "Monarch_Butterfly_Danaus_plexippus_Male_2664px.jpg",
  "bee": "Apis_mellifera_Western_honey_bee.jpg",
  "ant": "Fire_ants.jpg",
  "spider": "Spider_February_2008-1.jpg",
  "snail": "Cornu_aspersum_(Garden_Snail).jpg"
};

function getImageUrl(name) {
  const file = ANIMAL_FILES[name];
  if (!file) return null;
  // Official Wikimedia redirect – most reliable way
  return `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${encodeURIComponent(file)}&width=220`;
}

// ========== GAME STATE ==========
let score = 0;
let caughtCount = 0;
let uniqueCaught = new Set();
let level = 1;
let isPlaying = false;
let isPaused = false;
let voiceEnabled = true;
let currentAnimal = null;
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
  currentAnimal = null;
  updateHUD();

  playArea.querySelectorAll(".hole, .animal").forEach(el => el.remove());
  createHoles();

  const rect = playArea.getBoundingClientRect();
  netX = rect.width / 2;
  netY = rect.height / 2;
  updateNetPosition();

  lastSpawn = performance.now();
  requestAnimationFrame(gameLoop);
  setTimeout(() => spawnAnimal(), 500);
}

function restartGame() {
  if (currentAnimal) {
    if (currentAnimal.hideTimer) clearTimeout(currentAnimal.hideTimer);
    if (currentAnimal.el) currentAnimal.el.remove();
  }
  currentAnimal = null;
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
  const gap = Math.max(900, 1800 - level * 80);
  if (!currentAnimal && timestamp - lastSpawn > gap) {
    spawnAnimal();
    lastSpawn = timestamp;
  }
  if (isNetActive) tryCatch();
  animationId = requestAnimationFrame(gameLoop);
}

function spawnAnimal() {
  if (currentAnimal) return;
  const freeHoles = holes.filter(h => !h.occupied);
  if (freeHoles.length === 0) return;

  const hole = freeHoles[Math.floor(Math.random() * freeHoles.length)];
  hole.occupied = true;

  // Prefer animals that have photo mappings
  const photoNames = Object.keys(ANIMAL_FILES);
  const name = Math.random() < 0.9
    ? photoNames[Math.floor(Math.random() * photoNames.length)]
    : UNIQUE_ANIMALS[Math.floor(Math.random() * UNIQUE_ANIMALS.length)];

  const size = 160;
  const el = document.createElement("div");
  el.className = "animal popping";
  el.style.width = size + "px";
  el.style.height = size + "px";

  const imgUrl = getImageUrl(name);
  if (imgUrl) {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = name;
    img.draggable = false;
    img.loading = "eager";
    img.onerror = function() {
      // Nice fallback if image still fails
      el.innerHTML = "";
      el.textContent = name;
      el.style.fontSize = "0.85rem";
      el.style.fontWeight = "bold";
      el.style.color = "#3e2723";
      el.style.background = "#fff9c4";
      el.style.padding = "4px";
      el.style.textAlign = "center";
      el.style.lineHeight = "1.1";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
    };
    el.appendChild(img);
  } else {
    el.textContent = name;
    el.style.fontSize = "0.85rem";
    el.style.fontWeight = "bold";
    el.style.color = "#3e2723";
    el.style.background = "#fff9c4";
    el.style.padding = "4px";
    el.style.textAlign = "center";
  }

  el.style.left = (hole.x - size / 2) + "px";
  el.style.top = (hole.y - size / 2 - 18) + "px";
  playArea.appendChild(el);

  const stayTime = Math.max(650, 1300 - level * 70) + Math.random() * 180;

  const animal = { name, el, hole, size, caught: false, hideTimer: null };

  setTimeout(() => {
    if (!animal.caught) {
      el.classList.remove("popping");
      el.classList.add("visible");
    }
  }, 150);

  animal.hideTimer = setTimeout(() => {
    if (!animal.caught) hideAnimal(animal);
  }, stayTime);

  currentAnimal = animal;

  el.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!animal.caught) catchAnimal(animal);
  });
}

function hideAnimal(animal) {
  if (animal.caught || !animal.el) return;
  animal.el.classList.remove("visible", "popping");
  animal.el.classList.add("hiding");
  setTimeout(() => {
    if (animal.el && animal.el.parentNode) animal.el.remove();
    animal.hole.occupied = false;
    if (currentAnimal === animal) currentAnimal = null;
    lastSpawn = performance.now();
  }, 250);
}

function tryCatch() {
  if (!currentAnimal || currentAnimal.caught) return;
  const netRadius = isNetActive ? 72 : 62;
  const dist = Math.hypot(currentAnimal.hole.x - netX, currentAnimal.hole.y - netY);
  if (dist < netRadius + currentAnimal.size * 0.4) {
    catchAnimal(currentAnimal);
  }
}

function catchAnimal(animal) {
  if (animal.caught) return;
  animal.caught = true;
  if (animal.hideTimer) clearTimeout(animal.hideTimer);

  animal.el.classList.remove("popping", "visible", "hiding");
  animal.el.classList.add("caught");

  createBigConfetti(animal.hole.x, animal.hole.y);

  score += 15 + level * 3;
  caughtCount++;
  uniqueCaught.add(animal.name);
  if (caughtCount % 8 === 0) level++;

  updateHUD();
  showBigCelebration(animal.name);
  speakCatch(animal.name);
  playFanfare();

  setTimeout(() => {
    if (animal.el && animal.el.parentNode) animal.el.remove();
    animal.hole.occupied = false;
    currentAnimal = null;
    lastSpawn = performance.now();
  }, 550);
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
  }, 2200);
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
  utter.rate = 0.93;
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
