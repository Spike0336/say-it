# 🦋 Cute Catcher

**A fun children's game where adorable cartoon characters pop out of holes in the ground!**

Only one character appears at a time and they disappear quickly – so catching them feels exciting. When you catch one you get a big celebration with confetti, a fanfare, and a friendly British voice says:

*"I'm a frog. You caught me!"*

---

## ✨ Features

- **88 different cute cartoon characters** – animals, food, household objects, vehicles and more
- **Beautiful hand-drawn style images** – clear, colourful and friendly for children
- **One character at a time** – pops out of a hole
- **Generous display time** so the pictures fully render and children can see them clearly
- Pace gently increases as you level up
- **Big celebration** on every catch: confetti explosion + triumphant fanfare + voice
- **British female narrator** with correct grammar (“I’m an ant…”, “I’m water…”, etc.)
- **Big friendly net** – move with mouse or finger, click/tap to catch
- **Touch-friendly** – works great on tablets and phones
- **Score, unique characters, levels** – difficulty gently increases
- **No installs, no accounts** – just open and play
- **100% offline** (pure HTML/CSS/JS + local images)

---

## 🎮 How to Play

1. Click **Start Catching!**
2. Watch the holes – cute characters pop up quickly then dive back down
3. Move the green net over a character and click / tap (or just tap the character)
4. Enjoy the big confetti celebration and listen to the character announce itself
5. Catch as many as you can and try to discover lots of different characters

---

## 🚀 Running the Game

### Option 1 – Just open it
Double-click `index.html` or open it in any modern browser (Chrome, Firefox, Edge, Safari).

### Option 2 – Local server (recommended)
```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```
Then open http://localhost:8000

### Option 3 – GitHub Pages
1. Create a new repository on GitHub
2. Upload all the files (including the `images/` folder)
3. Go to **Settings → Pages**
4. Select the main branch and click Save
5. Your game will be live at `https://yourusername.github.io/repository-name/`

---

## 📁 Project Structure

```
animal-catcher/
├── index.html          # Main game page
├── style.css           # All styling and animations
├── script.js           # Game logic, voice, confetti
├── images/             # 88 cute cartoon character pictures
├── README.md
└── LICENSE
```

---

## 🗣️ Voice

The game uses the browser’s built-in Speech Synthesis and prefers a **British English female** voice when available.

---

## 📄 Licence

MIT – free to use, modify and share.
