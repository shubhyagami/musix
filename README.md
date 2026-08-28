# musix

A Java‑based music streaming and playlist manager with a low‑latency custom audio engine.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)
[![Build](https://img.shields.io/badge/Build-Maven-brightgreen)](pom.xml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Release](https://img.shields.io/badge/Release-v1.0.0-blueviolet)](https://github.com/shubhyagami/musix/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

## Overview
musix provides a lightweight Java audio engine that streams music with minimal latency and supports real‑time collaborative playlists. It is suitable for both standalone use and integration into larger Java applications.

## Key Features
- **Adaptive Playlists** – Discover new tracks that match your listening habits.
- **Custom Audio Engine** – Low‑latency playback with smooth cross‑fading.
- **Collaborative Editing** – Edit playlists together over WebSockets.
- **Offline Mode** – Cache tracks locally for uninterrupted playback.
- **Keyboard Shortcuts** – Control playback without leaving the keyboard.

## Getting Started
```bash
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
java -jar target/musix-1.0.0.jar
```
Open your browser at `http://localhost:8080` to access the UI.

## Usage

### Syncing Across Devices
Enable real‑time collaborative editing with the `--sync` flag.

### Keyboard Shortcuts
- Play/Pause: `Space`
- Skip Forward: `j`
- Skip Backward: `k`
- Toggle Shuffle: `s`

### Offline Mode
Cache a set number of tracks locally using `--cache-limit <N>` (e.g., `--cache-limit 50`).

### Exporting Playlists
Export playlists to M3U or JSON format with `--export-playlist <name>`.

## Architecture
The project uses the **Temporal Audio Routing Engine (TARE)**, a Java 17 implementation that decodes audio streams in isolated memory arenas and routes them over low‑latency virtual channels for stable playback.

## Contributing
1. Open an issue to discuss bugs or features.  
2. Fork the repository and create a branch (`git checkout -b feature/your-idea`).  
3. Implement changes, write tests, and keep commits focused.  
4. Submit a pull request targeting `main` with a clear description.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog
- **v1.0.0** – Initial release with core streaming, collaborative playlists, offline caching, and keyboard controls.
