# musix

A lightweight Java library and command‑line tool for low‑latency audio streaming and playlist management.

* **Fast, low‑latency audio engine (TARE)**
* **Collaborative playlist editing** via WebSocket
* **Offline caching** of tracks
* **Keyboard shortcuts** (play / pause / skip / shuffle)
* **CLI** and **embed‑able Maven** library

---

## Quick Start

```bash
# Clone & build
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package

# Run the server
java -jar target/musix-1.0.0.jar
```

The server listens on `http://localhost:8080`.  
Run `java -jar target/musix-1.0.0.jar --help` to see all options.

---

## Features

| Feature             | What it does                                 |
|---------------------|----------------------------------------------|
| **Low‑latency engine** | Cross‑fading between tracks with minimal delay |
| **Adaptive playlist** | Learns from listening patterns              |
| **Collaborative editing** | Shared playlists over WebSocket              |
| **Offline caching** | Configurable local cache size                |
| **Keyboard shortcuts** | Play/pause, skip, shuffle toggle           |
| **Export** | Export playlists to M3U or JSON              |

---

## Command‑Line Options

```text
Usage: musix-<ver>.jar [options]

Options:
  --help                     Show this help message and exit
  --port <p>                 Port number (default: 8080)
  --sync                     Enable WebSocket collaboration
  --cache-limit <N>          Max number of tracks cached locally
  --export-playlist <name>   Export the named playlist (M3U or JSON)
```

---

## Using musix as a Library

Add the dependency to your Maven `pom.xml`:

```xml
<dependency>
  <groupId>com.github.shubhyagami</groupId>
  <artifactId>musix</artifactId>
  <version>1.0.0</version>
</dependency>
```

Example usage:

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

See the generated [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs) for full API details.

---

## Architecture

`musix` is built around TARE (Temporal Audio Routing Engine). TARE decodes audio streams within isolated memory arenas and routes them over low‑latency virtual channels, keeping playback smooth even under heavy load.

---

## Contributing

1. Fork the repo and create a feature branch:  
   `git checkout -b feature/your‑feature`
2. Add tests for new code.
3. Run the test suite: `mvn test`.
4. Open a pull request against `main` and reference any related issue.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines and the Code of Conduct.

---

## Changelog

- **v1.0.0** – Initial release: engine, collaborative playlists, offline caching, keyboard controls.

---

## License

MIT © 2026 Shubhyagami. See the [LICENSE](LICENSE) file.

---

## Badges

![Java](https://img.shields.io/badge/Java-17+%20%7C%20Java‑21-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)  

---
