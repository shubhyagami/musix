# musix

musix is a lightweight Java library and command‑line application for streaming audio and managing playlists with low latency. It features a custom audio engine, collaborative playlist editing, offline caching, and keyboard shortcuts.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/)  
[![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)](https://github.com/shubhyagami/musix/actions)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)  
[![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)](https://github.com/shubhyagami/musix/releases)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/shubhyagami/musix/pulls)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Command‑Line Usage](#command-line-usage)
- [Using as a Library](#using-as-a-library)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

`musix` combines a fast, low‑latency audio engine with a flexible playlist system. It can be run as a standalone server (`musix-<ver>.jar`) or embedded in other Java projects via Maven. The engine, called **TARE** (Temporal Audio Routing Engine), decodes audio streams in isolated memory arenas and routes them over virtual channels to keep playback smooth.

---

## Features

| Feature | Description |
|--------|--------------|
| **Low‑latency engine** | Cross‑fading audio with minimal delay |
| **Adaptive playlists** | Playlists learn from your listening habits |
| **Collaborative editing** | WebSocket server for shared playlists |
| **Offline caching** | Configurable local cache of tracks |
| **Keyboard shortcuts** | Play/pause, skip forward/backward, shuffle toggle |
| **Playlist export** | Export to M3U or JSON |

---

## Quick Start

```bash
# Clone, build, and run
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
java -jar target/musix-1.0.0.jar
```

The server starts on `http://localhost:8080`.  
Use `--help` to see all command‑line options.

---

## Command‑Line Usage

```text
Usage: musix-<ver>.jar [options]

Options:
  --help                     Show this help message and exit
  --port <p>                 Port number (default: 8080)
  --sync                     Enable collaborative WebSocket server
  --cache-limit <N>         Max number of tracks cached locally
  --export-playlist <name>   Export the named playlist (M3U or JSON)
```

---

## Using as a Library

Add the following dependency to your Maven `pom.xml`:

```xml
<dependency>
    <groupId>com.github.shubhyagami</groupId>
    <artifactId>musix</artifactId>
    <version>1.0.0</version>
</dependency>
```

Example:

```java
import com.shubhyagami.musix.MusixEngine;

public class Demo {
    public static void main(String[] args) {
        MusixEngine engine = new MusixEngine();
        engine.play("song.mp3");
        engine.setShuffle(true);
    }
}
```

(See the Javadoc for a complete API reference.)

---

## Architecture

musix is built around **TARE** (Temporal Audio Routing Engine). TARE decodes streams in isolated memory arenas and routes them over low‑latency virtual channels, enabling stable playback even under high load.

---

## Contributing

1. Fork the repository and create a feature branch:  
   `git checkout -b feature/your-idea`
2. Implement your changes and add tests.
3. Run the test suite: `mvn test`.
4. Push and open a pull request against `main`.
5. Reference any related issue in the PR description.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines and the Code of Conduct.

---

## Changelog

- **v1.0.0** – Initial release: core streaming, collaborative playlists, offline caching, keyboard controls.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
