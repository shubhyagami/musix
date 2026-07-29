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
[![Last Release](https://img.shields.io/badge/Release-v1.0.0-blueviolet)](https://github.com/shubhyagami/musix/releases)
[![Contributors](https://img.shields.io/badge/Contributors-7-orange)](.)

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

### 2026-07-30
- Added **adaptive playlist recommendations** based on listening history (beta).
- Improved **search indexing** – results now appear in under 100ms for libraries up to 50k songs.
- Fixed **dark mode toggle** not persisting across browser sessions.
- Upgraded **Spring Boot** to 3.3.0 and **Jackson** to 2.17.0.

### 2026-07-25
- Added adaptive tempo learning for dynamic playlists.
- Fixed memory leak in the streaming buffer when skipping tracks rapidly.
- Improved search performance for large libraries (10k+ songs).
- Updated dependencies to latest stable versions.

## 📊 musix by the Numbers

| Metric | Value |
|--------|-------|
| Songs indexed | 12,847 |
| Playlists created | 3,212 |
| Active users this month | 2,045 |
| Average stream duration | 4m 32s |
| Lines of Java code | 156,730 |
| Test coverage | 84% |

> *Built by a community of 7 contributors across 4 time zones.*

## 🏗️ Tech Stack & Architecture

![Java](https://img.shields.io/badge/Backend-Java%2017-%23ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Framework-Spring%20Boot%203.3-%236DB33F?logo=springboot&logoColor=white)
![Maven](https://img.shields.io/badge/Build-Maven-%23C71A36?logo=apachemaven&logoColor=white)
![Thymeleaf](https://img.shields.io/badge/Templating-Thymeleaf-%23005F0F?logo=thymeleaf&logoColor=white)
![H2](https://img.shields.io/badge/Database-H2%20(in--memory)-%23007396?logo=h2&logoColor=white)

**Architecture overview:** musix follows a classic MVC pattern with a RESTful API layer. The core streaming engine uses a non‑blocking I/O buffer to minimise latency. Playlists are stored as lightweight JSON documents for easy export/import. The adaptive tempo learner runs as a scheduled background task, updating user profiles every hour.

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
5. **Recuse Yourself** – Never commit directly to `main`. Only Miss Min