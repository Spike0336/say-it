# say-it
A toddler speech game: tap a picture, say the word, and get a celebration fanfare. Single HTML file, no dependencies.
# Say It! 🗣️

A simple speech-practice game for toddlers. The child taps a picture, hears the
word spoken aloud, then says it into the microphone. If the app recognises the
word, it rewards them with a fanfare, confetti and a star.

It's a single `index.html` file with no dependencies, no build step and no
tracking.

## How it works

1. Six large pictures are shown at a time, chosen at random.
2. The child taps one. The app says the word aloud ("Cat!") and turns on the
   microphone.
3. If the child says the word, a fanfare plays, confetti falls and a star is
   added to the session count.
4. If not, a gentle "Nearly! Try again" prompt is shown, with no harsh sounds.

## Features

- **370 words** with emoji pictures: animals, food, household objects,
  transport, nature, body parts, colours, shapes and numbers 1–10.
- **Toddler-friendly matching:** accepts baby words and sound-alikes
  ("doggy", "nana", "moo", "choo choo") and near misses, since toddler
  speech is rarely clear.
- **Grown-up override:** a small "he said it ✓" button counts an answer as
  correct when the microphone misses it.
- **My Favourites mode:** press and hold the ⚙️ button at the bottom of the
  screen to choose a smaller set of words to practise. Choices are saved in
  the browser.
- **Session-only stars:** the star count resets when the page is closed.
- **Sound effects** are generated in the browser with the Web Audio API, so
  there are no audio files.

## Browser support and requirements

| Requirement | Detail |
|---|---|
| Browser | Chrome or Edge (desktop and Android) work best |
| Firefox | Not supported (no Web Speech recognition) |
| Safari / iOS | Limited and unreliable |
| Connection | Internet needed: Chrome sends audio to Google for recognition |
| Security | Must be served over **HTTPS** (or `localhost`) for the microphone |

When served from its own HTTPS address, the browser asks for microphone access
once and remembers the choice. Embedded or `file://` pages may ask every time.

## Run it

Open `index.html` through any static host (GitHub Pages, Netlify, Cloudflare
Pages), or locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Customising

- Words are listed in the `ITEMS` array and the `RAW` string near the top of
  the script as `emoji word` pairs.
- Alternative pronunciations are in the `ALT` object.
- Recognition language is set to `en-GB` in the `listen()` function.

## Technology

Vanilla HTML, CSS and JavaScript using the Web Speech API (speech recognition
and synthesis), the Web Audio API and `localStorage`.

## Privacy

There's no analytics and no accounts. Favourite words are stored locally in the
browser. Speech recognition is handled by the browser's built-in service, which
may send audio to the browser vendor for processing.

## Licence

Add your preferred licence, for example MIT.
