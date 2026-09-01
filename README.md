# musix  

A lightweight Java music streaming and playlist manager with a low‑latency custom audio engine.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)  
[![Build](https://img.shields.io/badge/Build-Maven-brightgreen)](https://github.com/shubhyagami/musix/actions)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)  
[![Release](https://img.shields.io/badge/Release-v1.0.0-blueviolet)](https://github.com/shubhyagami/musix/releases)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/shubhyagami/musix/pulls)  
[![Docs](https://img.shields.io/badge/docs-yes-brightgreen)](https://github.com/shubhyagami/musix/blob/main/README.md)  

---  

## Overview  

`musix` is a compact, fast Java audio engine that streams tracks with minimal latency and supports real‑time collaborative playlists. It can be used as a standalone application or embedded in other Java projects.

## Key Features  

- Adaptive playlists that learn your listening habits  
- Low‑latency custom audio engine with smooth cross‑fading  
- Collaborative editing via WebSockets for shared playlists  
- Offline caching for uninterrupted playback  
- Keyboard shortcuts for hands‑free control  

## Getting Started  

1. **Clone the repository**  
   git clone https://github.com/shubhyagami/musix.git  
   cd musix  

2. **Build**  
   mvn clean package  

3. **Run**  
   java -jar target/musix-1.0.0.jar [options]  

   By default the application starts a server on http://localhost:8080.  
   Use --help to see all command‑line options.

### Quick start  

mvn clean package && java -jar target/musix-1.0.0.jar  

For a minimal launch use the default settings; add --help to explore flags.

## Usage  

### Syncing Across Devices  

Enable collaborative editing with the --sync flag.

### Keyboard Shortcuts  

- Space – Play/Pause  
- j – Skip Forward  
- k – Skip Backward  
- s – Toggle Shuffle  

### Offline Mode  

Cache a configurable number of tracks locally using --cache-limit <N> (e.g., --cache-limit 50).

### Exporting Playlists  

Export playlists to M3U or JSON with --export-playlist <name>.

## Architecture  

The project uses the **Temporal Audio Routing Engine (TARE)**, a Java 17 implementation that decodes audio streams in isolated memory arenas and routes them over low‑latency virtual channels for stable playback.

## Contributing  

1. Open an issue to discuss bugs or new features.  
2. Fork the repository and create a branch (git checkout -b feature/your-idea).  
3. Implement changes, add tests, and keep commits focused.  
4. Submit a pull request targeting main with a clear description.

## Changelog  

- **v1.0.0** – Initial release with core streaming, collaborative playlists, offline caching, and keyboard controls.

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---  

*Feel free to explore the source, file issues, and contribute!*
