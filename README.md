# 🎵 musix

```
   __  ___     __  _   __
  /  |/  /__ _/ /_(_) / /
 / /|_/ / _ `/ __/ / / / 
/_/  /_/\_,_/\__/_/ /_/  
   Music streaming & playlist manager in Java
```

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Maven-brightgreen)](pom.xml)
[![Status](https://img.shields.io/badge/Status-Active-success)](.)

> *“Music is the shorthand of emotion.”* — Leo Tolstoy

## Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/shubhyagami/musix.git
   cd musix
   ```

2. **Build with Maven**
   ```bash
   mvn clean package
   ```

3. **Run the application**
   ```bash
   java -jar target/musix-1.0.0.jar
   ```

4. **Open your browser**  
   Navigate to `http://localhost:8080` and start exploring your music library.

## Featured Use Case

**Morning Workout Boost** – Create a dynamic playlist that mixes high‑energy tracks with your recent favourites. musix’s adaptive algorithm learns your tempo preference over time, so every run feels fresh.

## Pro Tips

- **Smart Search** – Use `artist: "Radiohead"` or `year: 1997` in the search bar to filter results instantly.
- **Playlist Sync** – Export your playlists to JSON and share them with friends. Import works too!
- **Dark Mode** – Toggle it from the settings menu to save battery on late‑night listening sessions.

## Weekly Highlight

**2026‑07‑25** – This week’s most added song is “Blinding Lights” by The Weeknd (again!), and the longest playlist in the system now clocks in at 14 hours and 23 minutes. Can you beat it?

## Changelog

### 2026-07-25
- Added adaptive tempo learning for dynamic playlists.
- Fixed memory leak in the streaming buffer when skipping tracks rapidly.
- Improved search performance for large libraries (10k+ songs).
- Updated dependencies to latest stable versions.

---

## 🕰️ Contributing (TVA Temporal Guidelines)

Welcome, Variant Developer! The Sacred Timeline of musix depends on contributors like you. Before you open a pull request, heed the words of the Time Keepers:

### 📜 The Sacred Protocol

1. **Detect & Document** – File an issue before branching. Describe the variant (bug), the timeline (version), and your intended prune.
2. **Branch with Purpose** – Name your branch after the era you're improving:
   - `sacred/feat-playlist-vault` for new features
   - `sacred/fix-stream-prune` for bug fixes
   - `sacred/chrono-deps` for dependency updates
3. **Prune Cleanly** – Run `mvn verify` locally. If the Sacred Timeline fails to compile, the Miss Minutes will laugh at you.
4. **Sign the Variant Log** – Every commit message must begin with one of:
   - `[FEAT]` A new branch sprouts from the timeline.
   - `[FIX]` A pruned deviation has been restored.
   - `[DOCS]` Chronological records updated.
   - `[REFACTOR]` A nexus event, no behavior change.
5. **Recuse Yourself** – Never commit directly to `main`. Only Miss Minutes holds the Master Script.

### ⚖️ Code of Conduct

We do not prune people, only bad code. Be kind. Be patient. Remember: every contributor was once a Variant who just wanted their PR merged.

### 🏆 Hall of Variants

Top contributors are immortalized in `CREDITS.md` and granted the title of **Timeline Keeper**. Submit 5 merged PRs to be eligible.

### 🔒 Security Variants

Found a vulnerability? **Do NOT open a public issue.** Email `sacred-timeline@musix.tva` immediately. The TVA will investigate before any branched exploits can spread.

> *"For all time. Always."* — TVA Motto