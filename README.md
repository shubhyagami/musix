# 🎵 musix

A Java-based music streaming and playlist manager that provides a low-latency custom audio engine.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)
[![Build](https://img.shields.io/badge/Build-Maven-brightgreen)](pom.xml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Release](https://img.shields.io/badge/Release-v1.0.0-blueviolet)](https://github.com/shubhyagami/musix/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

> *"Music is the shorthand of emotion."* — Leo Tolstoy

## Key Features

* **Adaptive Playlists**: Create dynamic playlists that learn your tempo preferences and adapt to your listening habits
* **Custom Audio Engine**: A low-latency audio routing engine ensures glitch-free playback and smooth crossfading
* **Collaborative Editing**: Edit playlists in real-time with other users via WebSockets
* **Offline Mode**: Cache your favorite tracks locally to keep the music playing when the connection drops
* **Keyboard Shortcuts**: Control playback without leaving your keyboard

## Getting Started

### Installation

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/shubhyagami/musix.git
   cd musix
   ```
2. Build the project using Maven:
   ```bash
   mvn clean package
   ```
3. Run the application using the Java executable:
   ```bash
   java -jar target/musix-1.0.0.jar
   ```
4. Access the UI by opening your browser at `http://localhost:8080`.

## Usage

### Syncing Across Devices

* Enable real-time collaborative playlist editing across multiple clients by using the `--sync` flag.

### Keyboard Shortcuts

* Play/Pause: `Space`
* Skip Forward: `j`
* Skip Backward: `k`
* Toggle Shuffle: `s`

### Offline Mode

* Pre-cache your top 50 tracks using `--cache-limit 50` to ensure uninterrupted playback offline.

### Exporting Playlists

* Export your playlists as M3U or JSON files using the `--export-playlist` command.

## Architecture

musix is built around the **Temporal Audio Routing Engine (TARE)**, a Java 17-based engine that decodes audio streams in isolated memory arenas and routes them via low-latency virtual channels for stable playback.

```
[ Audio Source ] -> [ TARE Decoder ] -> [ Isolated Memory Arena ] -> [ Virtual Audio Channel ] -> [ Output Stream ]
```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. **Open an Issue**: Describe the bug or feature you'd like to propose
2. **Create a Branch**: Branch out from `main`
   ```bash
   git checkout -b feature/your-awesome-idea
   ```
3. **Make Your Changes**:
   - Follow the existing code style
   - Write tests for your new features or bug fixes
   - Keep commits atomic and focused
4. **Submit a Pull Request**: Target the `main` branch and provide a clear description of your changes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
