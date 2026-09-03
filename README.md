# musix

A lightweight Java library and command‑line tool for low‑latency audio playback and collaborative playlist management.

- Fast, low‑latency audio engine (TARE)
- Collaborative playlist editing via WebSocket
- Offline caching of tracks
- Keyboard shortcuts (play / pause / skip / shuffle)
- CLI and embeddable Maven library

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build the project
mvn clean package

# Run the server (defaults to http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

Display all command‑line options:

```bash
java -jar target/musix-1.0.0.jar --help
```

---

## Features

| Feature | Description |
|---------|-------------|
| **Low‑latency engine** | Cross‑fades between tracks with minimal delay using TARE (Temporal Audio Routing Engine). |
| **Adaptive playlist** | Learns from listening patterns to suggest tracks. |
| **Collaborative editing** | Real‑time sharing of playlists over WebSocket. |
| **Offline caching** | Configurable local cache for frequent tracks. |
| **Keyboard shortcuts** | Play, pause, skip forward/backward, toggle shuffle. |
| **Export** | Export playlists to M3U or JSON. |

---

## Command‑Line Usage

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

## Library API

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

See the [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs) for complete API details.

---

## Architecture

`musix` revolves around TARE, which decodes audio in isolated memory arenas and routes them through low‑latency virtual channels. This design keeps playback smooth even under heavy load and enables rapid playlist transitions.

---

## Contributing

1. Fork the repo and create a feature branch:  
   `git checkout -b feature/your‑feature`
2. Add unit tests for any new or modified code.
3. Run the test suite: `mvn test`.
4. Open a pull request against `main` and reference any related issue.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines and the Code of Conduct.

---

## Changelog

- **v1.0.0** – Initial release: engine, collaborative playlists, offline caching, keyboard controls.

---

## License

MIT © 2026 Shubhyagami. See the [LICENSE](LICENSE) file.
