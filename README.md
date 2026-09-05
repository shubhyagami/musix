# Musix

Musix is a lightweight Java library and a short‑running command‑line server that delivers low‑latency audio playback and real‑time, collaborative playlist management.

---

## 📦 Build & CI

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen)  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Server](#server)
  - [Library](#library)
- [Command‑Line Options](#command-line-options)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

Musix combines a deterministic audio engine with a lightweight WebSocket layer for collaborative playlist editing. It is built to run on Java 17+ and is packaged as a single executable JAR or a Maven dependency. The server serves a minimal HTTP+WebSocket API, while the library offers a programmatic interface for embedded usage.

---

## Features

- **Deterministic low‑latency engine** – sub‑second cross‑fade and predictable CPU usage.
- **Real‑time collaboration** – WebSocket protocol syncs playlist changes across clients.
- **Adaptive recommendations** – tracks are suggested based on listening history.
- **Configurable local cache** – keep hot tracks in memory up to a configurable limit.
- **Keyboard shortcuts** – play, pause, skip, shuffle, and more.
- **Export support** – M3U and JSON playlist export.

---

## Getting Started

### Server

```bash
# Clone the repository
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build with Maven
mvn clean package

# Run the server (default: http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

View available command‑line flags:

```bash
java -jar target/musix-1.0.0.jar --help
```

### Library

Add the dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>com.github.shubhyagami</groupId>
  <artifactId>musix</artifactId>
  <version>1.0.0</version>
</dependency>
```

Sample usage:

```java
import com.shubhyagami.musix.MusixEngine;

public class Demo {
    public static void main(String[] args) {
        MusixEngine engine = new MusixEngine();

        engine.loadPlaylist("my_playlist.m3u");
        engine.play();
        engine.setShuffle(true);

        // Listen to events
        engine.addListener(event -> System.out.println(event));
    }
}
```

Full API documentation is available in the generated [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs).

---

## Command‑Line Options

```
Usage: musix-<version>.jar [options]

Options:
  --help                      Show help and exit
  --port <p>                  Port number (default: 8080)
  --sync                      Enable WebSocket collaboration
  --cache-limit <N>           Max number of tracks cached locally
  --export-playlist <name>    Export the named playlist (M3U or JSON)
```

---

## API Reference

The public API is dominated by the `MusixEngine` class:

| Method | Description |
|--------|-------------|
| `loadPlaylist(String path)` | Load an M3U or JSON playlist. |
| `play()` | Start playback. |
| `pause()` | Pause playback. |
| `stop()` | Stop playback. |
| `setShuffle(boolean)` | Toggle shuffle mode. |
| `addListener(Consumer<Event>)` | Register a callback for playback events. |

See the [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs) for the full set of methods and event types.

---

## Architecture

Musix is centered around the *Temporal Audio Routing Engine* (TARE). Audio data is decoded into isolated memory arenas that are routed through virtual channels, ensuring deterministic latency and predictable CPU usage even under heavy load.  

The WebSocket layer uses a lightweight protocol that pushes only the minimal state required for collaboration, keeping bandwidth consumption low. The server is a self‑contained HTTP + WebSocket listener implemented with Jetty.

---

## Contributing

We welcome contributions! Please:

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Write unit tests for your changes.
3. Run the test suite with `mvn test`.
4. Submit a pull request against the `main` branch.

Follow the guidelines in the [CONTRIBUTING](CONTRIBUTING.md) file and the Code of Conduct.

---

## Changelog

### v1.0.0
- Initial release
- Low‑latency audio engine
- WebSocket‑based playlist collaboration
- Local caching and adaptive recommendations
- Keyboard shortcuts and export support

---

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
