# musix
A lightweight Java library and command‑line server that delivers low‑latency audio playback and real‑time collaborative playlist management.

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen)  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Command‑Line Usage](#command-line-usage)
- [Library API](#library-api)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build with Maven
mvn clean package

# Run the server (defaults to http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

See all available options:

```bash
java -jar target/musix-1.0.0.jar --help
```

---

## Features

- **Low‑latency engine** – sub‑second cross‑fade and deterministic CPU usage.
- **WebSocket collaboration** – real‑time playlist editing for multiple users.
- **Adaptive suggestions** – learning from listening habits.
- **Local cache** – config‑driven size limit for hot tracks.
- **Keyboard shortcuts** – play, pause, skip, shuffle.
- **Export** – M3U and JSON playlist export.

---

## Command‑Line Usage

```text
Usage: musix-<version>.jar [options]

Options:
  --help                      Show help and exit
  --port <p>                  Port number (default: 8080)
  --sync                      Enable WebSocket collaboration
  --cache-limit <N>           Max number of tracks cached locally
  --export-playlist <name>    Export the named playlist (M3U or JSON)
```

---

## Library API

Add the dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>com.github.shubhyagami</groupId>
  <artifactId>musix</artifactId>
  <version>1.0.0</version>
</dependency>
```

Typical usage:

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

## Architecture

`musix` is built around the Temporal Audio Routing Engine (TARE). Audio frames are decoded into isolated memory arenas and routed through virtual channels, providing very low latency and predictable CPU usage even under heavy load. The WebSocket layer uses a lightweight protocol that pushes only minimal state to collaborators, keeping bandwidth consumption low. The server side is a minimal, self‑contained HTTP + WebSocket listener implemented with Jetty.

---

## Contributing

1. Fork the repository and create a feature branch  
   ```bash
   git checkout -b feature/your-feature
   ```
2. Write unit tests for your changes.  
3. Run the test suite: `mvn test`.  
4. Open a pull request against `main`.  
5. Follow the guidelines in the [CONTRIBUTING](CONTRIBUTING.md) and the Code of Conduct.

---

## Changelog

### v1.0.0
- Initial release: low‑latency engine, collaborative playlists, offline caching, keyboard shortcuts, export support.

---

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
