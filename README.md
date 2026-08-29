# musix

A lightweight Java music streaming and playlist manager with a low‑latency custom audio engine.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)  
[![Build](https://img.shields.io/badge/Build-Maven-brightgreen)](pom.xml)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)  
[![Release](https://img.shields.io/badge/Release-v1.0.0-blueviolet)](https://github.com/shubhyagami/musix/releases)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

## Overview
musix provides a small, fast Java audio engine that streams tracks with minimal latency and enables real‑time collaborative playlists. It can run as a standalone application or be embedded in other Java projects.

## Key Features
- Adaptive playlists that learn your listening habits  
- Low‑latency custom audio engine with smooth cross‑fading  
- Collaborative editing via WebSockets for shared playlists  
- Offline caching for uninterrupted playback  
- Keyboard shortcuts for hands‑free control  

## Getting Started
```bash
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
java -jar target/musix-1.0.0.jar
```
The application starts on `http://localhost:8080`.  

### Quick start
```bash
# Start with default settings
java -jar target/musix-1.0.0.jar
```
Add `--help` to see all command‑line options.

## Usage

### Syncing Across Devices
Enable collaborative editing with the `--sync` flag.

### Keyboard Shortcuts
- Play/Pause: `Space`  
- Skip Forward: `j`  
- Skip Backward: `k`  
- Toggle Shuffle: `s`  

### Offline Mode
Cache a configurable number of tracks locally using `--cache-limit <N>` (e.g., `--cache-limit 50`).

### Exporting Playlists
Export playlists to M3U or JSON with `--export-playlist <name>`.

## Architecture
The project uses the **Temporal Audio Routing Engine (TARE)**, a Java 17 implementation that decodes audio streams in isolated memory arenas and routes them over low‑latency virtual channels for stable playback.

## Contributing
1. Open an issue to discuss bugs or new features.  
2. Fork the repository and create a branch (`git checkout -b feature/your-idea`).  
3. Implement changes, add tests, and keep commits focused.  
4. Submit a pull request targeting `main` with a clear description.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog
- **v1.0.0** – Initial release with core streaming, collaborative playlists, offline caching, and keyboard controls.
