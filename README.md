# Musix

> A lightweight Java library and command‑line server for low‑latency audio playback with real‑time playlist collaboration.

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build & run the demo server (default: http://localhost:8080)
mvn clean package
java -jar target/musix-1.0.0.jar
```

Run `java -jar target/musix-1.0.0.jar --help` to see all command‑line options.

---

## 📦 Build & CI

![Java](https://img.shields.io/badge/Java-17%2B-blue)
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)
![License](https://img.shields.io/badge/License-MIT-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Run the Server](#run-the-server)
  - [Use the Library](#use-the-library)
- [Command‑Line Options](#command-line-options)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

Musix delivers deterministic, low‑latency audio playback on Java 17+. It combines a high‑performance audio engine with a lightweight Jetty‑based HTTP and WebSocket server. Clients can connect to the server or use the standalone library to manage playlists, synchronize changes in real time, and play music directly from Java code.

---

## Features

- **Deterministic audio** – sub‑second cross‑fade, predictable CPU usage.
- **Real‑time collaboration** – WebSocket protocol synchronizes playlist changes instantly.
- **Adaptive recommendations** – tracks suggested from listening history.
- **Configurable local cache** – keep hot tracks in memory up to a user‑defined limit.
- **Keyboard shortcuts** – play, pause, skip, shuffle, and more.
- **Export support** – M3U & JSON playlist export.

---

## Getting Started

### Run the Server

```bash
# Build the JAR
mvn clean package

# Run (default: http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

### Use the Library

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
        engine.addListener(event -> System.out.println(event));
    }
}
```

Full API documentation is available in the generated [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs).

---

## Command‑Line Options

```text
Usage: musix-<version>.jar [options]

Options:
  --help                      Show help and exit
  --port <p>                  Port number (default: 8080)
  --sync                      Enable WebSocket collaboration
  --cache-limit <N>           Max number of tracks cached locally
  --export-playlist <name>    Export named playlist (M3U or JSON)
```

---

## API Reference

The core of the library is the `MusixEngine` class.

| Method                                 | Description                                    |
|----------------------------------------|------------------------------------------------|
| `loadPlaylist(String path)`            | Load an M3U or JSON playlist.                |
| `play()`                               | Start playback.                                |
| `pause()`                               | Pause playback.                               |
| `stop()`                                | Stop playback.                                |
| `setShuffle(boolean)`                   | Toggle shuffle mode.                          |
| `addListener(Consumer<Event>)`          | Register a callback for playback events.      |

See the full Javadoc for additional methods and event types.

---

## Architecture

Musix is built around the *Temporal Audio Routing Engine* (TARE). Audio data is decoded into isolated memory arenas that flow through virtual channels, guaranteeing deterministic latency and predictable CPU usage. The WebSocket layer transmits only the minimal state needed for collaboration, keeping bandwidth low. The server is a self‑contained HTTP + WebSocket listener built with Jetty.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Write unit tests for your changes.
3. Run the test suite with `mvn test`.
4. Submit a pull request against the `main` branch.

Refer to the [CONTRIBUTING](CONTRIBUTING.md) file and the Code of Conduct for more details.

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
