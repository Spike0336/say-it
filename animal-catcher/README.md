# 🦋 Animal Catcher

**A fun children's game where real animal photos pop out of holes in the ground!**

Only one animal appears at a time and they disappear quickly – so catching them feels exciting. When you catch one you get a big celebration with confetti, a fanfare, and the animal proudly says:

*"I'm a frog. You caught me!"*

---

## ✨ Features

- **240+ different animals** – farm animals, wild animals, birds, sea creatures, insects and more
- **Real animal photos** from Wikimedia Commons (clear pictures of lions, frogs, elephants, etc.)
- **One animal at a time** – pops out of a hole and disappears quickly
- **Faster pace** – stays visible for a shorter time as you level up
- **Big celebration** on every catch: confetti explosion + triumphant fanfare + voice
- **Voice announcements** – clear phrases like “I’m a frog. You caught me!”
- **Big friendly net** – move with mouse or finger, click/tap to catch
- **Touch-friendly** – works great on tablets and phones
- **Score, unique animals, levels** – difficulty gently increases
- **No installs, no accounts** – just open and play
- **100% offline** after first load (pure HTML/CSS/JS)

---

## 🎮 How to Play

1. Click **Start Catching!**
2. Watch the holes – animals pop up quickly then dive back down
3. Move the green net over an animal and click / tap (or just tap the animal)
4. Enjoy the big confetti celebration and listen to the animal announce itself
5. Catch as many as you can and try to discover lots of different animals

---

## 🚀 Running the Game

### Option 1 – Just open it
Double-click `index.html` or open it in any modern browser (Chrome, Firefox, Edge, Safari).

### Option 2 – Local server (recommended for best speech support)
```bash
# If you have Python
python -m http.server 8000

# Or with Node
npx serve .
```
Then open http://localhost:8000

---

## 📤 Putting it on GitHub

1. Create a new repository on GitHub (for example `animal-catcher`)
2. Upload all the files in this folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. (Optional) Enable **GitHub Pages**:
   - Go to the repo → Settings → Pages
   - Source: Deploy from a branch → `main` / root
   - Your game will be live at `https://yourusername.github.io/animal-catcher/`

That’s it! Kids can play it anywhere.

---

## 🛠️ Project Structure

```
animal-catcher/
├── index.html      # Main page
├── style.css       # All the colorful styling & animations
├── script.js       # Game logic + 220+ animals + voice
└── README.md       # This file
```

---

## 🎤 Voice Notes

- Works in Chrome, Edge, Safari and most modern browsers
- Uses the Web Speech API (no internet needed after page load)
- You can turn the voice on/off with the button at the bottom
- Some browsers need a user click before they allow speech

---

## 🎨 Customization Ideas

Want to make it your own?
- Add more animals in the `ANIMALS` array in `script.js`
- Change colors in `style.css`
- Add animal facts or sounds
- Add a “collection book” of all animals you’ve caught

---

## 📄 License

MIT License – feel free to use, share, modify and put it in your own projects or classrooms.

Made with ❤️ for curious kids who love animals.
