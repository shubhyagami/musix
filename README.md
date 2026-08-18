# 🎵 musix

A Java-based music streaming and playlist manager.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)
[![Build](https://img.shields.io/badge/Build-Maven-brightgreen)](pom.xml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Release](https://img.shields.io/badge/Release-v1.0.0-blueviolet)](https://github.com/shubhyagami/musix/releases)

> *"Music is the shorthand of emotion."* — Leo Tolstoy

## Features

- **Adaptive Playlists:** Create dynamic playlists that learn your tempo preferences and adapt to your listening habits.
- **Low-Latency Audio Engine:** Custom-built audio routing engine ensures glitch-free playback and smooth crossfading.
- **Collaborative Editing:** Edit playlists in real-time with other users via WebSockets.
- **Offline Mode:** Cache your favorite tracks locally to keep the music playing when the connection drops.
- **Keyboard Shortcuts:** Control playback without leaving your keyboard.

## Getting Started

### Prerequisites

- Java 17 or later
- Maven

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhyagami/musix.git
   cd musix
   ```

2. **Build the project**
   ```bash
   mvn clean package
   ```

3. **Run the application**
   ```bash
   java -jar target/musix-1.0.0.jar
   ```

4. **Access the UI**  
   Open your browser and navigate to `http://localhost:8080` to explore your music library.

## Architecture

At the core of musix is the **Temporal Audio Routing Engine (TARE)**. Built in Java 17, TARE decodes audio streams in isolated memory arenas and routes them via low-latency virtual channels to guarantee stable playback.

```
[ Audio Source ] -> [ TARE Decoder ] -> [ Isolated Memory Arena ] -> [ Virtual Audio Channel ] -> [ Output Stream ]
```

The engine maintains sub-10ms latency, easily handling crossfading high-bitrate tracks and real-time collaborative edits.

## Usage Tips

- **Sync Across Devices:** Use the `--sync` flag to enable real-time collaborative playlist editing across multiple clients.
- **Keyboard Shortcuts:** Hit `Space` to play/pause, `j` to skip forward, `k` to skip backward, and `s` to toggle shuffle.
- **Offline Mode:** Pre-cache your top 50 tracks using `--cache-limit 50` to ensure uninterrupted playback offline.
- **Export Playlists:** Use the `--export-playlist` command to export your playlists as M3U or JSON files.

## Changelog

### v1.0.0 (2026-08-06)
- **New Feature:** Added `--export-playlist` command to export playlists as M3U or JSON.
- **Improvement:** Reduced memory footprint of the TARE decoder by 12% when handling large libraries.
- **Bug Fix:** Resolved an issue where the progress bar would flicker during crossfade transitions.
- **Docs:** Updated the API reference with WebSocket endpoint descriptions for collaborative editing.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. **Open an Issue:** Describe the bug or feature you'd like to propose.
2. **Create a Branch:** Branch out from `main`.
   ```bash
   git checkout -b feature/your-awesome-idea
   ```
3. **Make Your Changes:**
   - Follow the existing code style (we use EditorConfig and Checkstyle).
   - Write tests for your new features or bug fixes.
   - Keep commits atomic and focused.
4. **Submit a Pull Request:** Target the `main` branch and provide a clear description of your changes. Add a changelog entry under the next release date.

Please be respectful in your interactions with other contributors and maintainers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
