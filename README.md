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
[![Sonic Pulse](https://img.shields.io/badge/Sonic_Pulse-Synchronized-ff69b4)](.)

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

## ⚡ The Musix Sonic Architecture

At the heart of musix lies the bespoke **Temporal Audio Routing Engine (TARE)**. Built from the ground up in Java 17, TARE guarantees glitch-free playback by decoding audio streams in isolated memory arenas and routing them via low-latency virtual channels. 

```
[ Audio Source ] -> [ TARE Decoder ] -> [ Isolated Memory Arena ] -> [ Virtual Audio Channel ] -> [ Output Stream ]
```

Whether you're crossfading 320kbps tracks or driving real-time collaborative edits over WebSockets, the engine maintains sub-10ms latency without breaking a sweat.

## Weekly Highlight

**This Week's Sonic Stat** – Over **84,000** songs have been indexed across all user libraries, with an average playlist length of 23 tracks. The most popular genre among contributors is *Synthwave*, followed closely by *Lofi Hip-Hop*.

## Pro Tips

- **Sync Across Devices** – Use the `--sync` flag to enable real-time collaborative playlist editing across multiple clients. Perfect for road trips or shared listening sessions.
- **Keyboard Shortcuts** – Hit `Space` to play/pause, `j` to skip forward, `k` to skip backward, and `s` to toggle shuffle. No mouse required.
- **Offline Mode** – Pre-cache your top 50 tracks with `--cache-limit 50` so you never miss a beat even when the Wi‑Fi drops.

## Changelog (2026-08-06)

- **New Feature:** Added `--export-playlist` command to export any playlist as M3U or JSON.
- **Improvement:** Reduced memory footprint of TARE decoder by 12% when handling large libraries.
- **Bug Fix:** Resolved an issue where the progress bar would flicker during crossfade transitions.
- **Docs:** Updated the API reference with WebSocket endpoint descriptions for collaborative editing.

## 🕰️ Contributing (TVA‑Style)

Welcome, Variant! You’ve stumbled upon the **Sacred Timeline of musix**. The Time Variance Authority (TVA) oversees all pull requests, branches, and commits to ensure the timeline remains uncorrupted. Before you prune anything, please review our guidelines.

### 🔧 How to Contribute

1. **File a Nexus Event**  
   If you spot a bug or have an idea, open an Issue. The TVA will assign a Minuteman to assess its threat to the timeline.

2. **Create a New Branch from the Sacred Timeline**  
   ```bash
   git checkout -b feature/your-awesome-idea
   ```  
   *Branch names must not contain nexus events (e.g., no `fix-everything`).*

3. **Make Your Changes – No TemPad Required**  
   - Follow the existing code style (we use EditorConfig and Checkstyle).
   - Write tests – the TVA’s **Time-Keepers** will review every assertion.
   - Keep commits atomic. A single commit should not cause a multiversal war.

4. **Submit a Pull Request**  
   - Target the `main` branch – only the Sacred Timeline is accepted.
   - Provide a clear description of what your PR changes and why.
   - Add a changelog entry under the next release date.

5. **Await Judgment**  
   The TVA will review your PR. If approved, your code will be merged into the timeline. If not, you’ll receive a friendly variant reset (and suggestions for improvement).

### 📜 Code of Conduct

Be excellent to each other. No timeline tampering, no Loki-style mischief, and always respect the sacred timeline’s coding standards.

---

*Happy listening, Variant!* 🎧