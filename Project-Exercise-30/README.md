# Project Exercise 30: Spotify‑Like Song Streaming Application

## 🎵 Project Overview

Build a full‑stack React application that mimics the core functionality of a music streaming service such as **Spotify**. The app will play audio files stored locally, fetch metadata from a mock API, manage global application state, and offer a polished, responsive UI using TailwindCSS.

Users should be able to:

- Browse a library of songs and playlists
- View song details (title, artist, album art, duration)
- Play, pause, skip forward/backward, and seek within a track
- Navigate between pages using React Router (home, song detail, playlists, settings, etc.)
- Persist and manipulate global state (current track, queue, user preferences) via **Redux** or **Context API**
- Fetch and cache song metadata from a mock API endpoint
- Enjoy a responsive experience styled with TailwindCSS

Performance is critical – the player should remain smooth, even on mobile, with optimized rendering and media handling. Deployment targets include Netlify or Vercel once the app is complete.

---

## 🛠️ Skills Covered

- Full‑stack React development with Vite
- Routing with `react-router-dom`
- State management using **Redux** or **Context API**
- API integration and caching strategies
- Responsive UI design with TailwindCSS
- Audio playback and media performance optimization
- Project deployment to Netlify/Vercel

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run development server**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Tip:** Place your MP3/OGG files inside the `public/songs` directory so they are served statically.

---

## 📁 Suggested Project Structure

```
Project-Exercise-30/
├── public/
│   ├── songs/           # audio files (.mp3, .ogg, etc.)
│   └── vite.svg
├── src/
│   ├── components/      # UI components (Player, SongCard, Playlist, etc.)
│   ├── hooks/           # custom hooks (useAudioPlayer, useFetchSongs)
│   ├── store/           # redux slices (if using Redux)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css        # Tailwind base styles
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

> You can copy the setup from earlier exercises such as **Project‑Exercise‑29** or **money‑management‑app** as a starting point, then layer in audio handling and routing logic.

Good luck building your streaming app! 🎧