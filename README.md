# musix

A lightweight Java library and command‑line server for low‑latency audio playback and collaborative playlist management.

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## Getting Started

```bash
# Clone
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build
mvn clean package

# Run the server (default: http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

To see all available options:

```bash
java -jar target/musix-1.0.0.jar --help
```

---

## Features

- **Low‑latency engine** – sub‑second cross‑fade, deterministic CPU usage.
- **WebSocket collaboration** – real‑time playlist editing for multiple users.
- **Adaptive suggestions** – learning from your listening habits.
- **Local cache** – configurable size for hot tracks.
- **Keyboard shortcuts** – play, pause, skip, shuffle.
- **Export** – M3U and JSON playlist export.

---

## Command‑Line options

```
Usage: musix‑<version>.jar [options]

Options:
  --help                      Show this help message and exit
  --port <p>                  Port number (default: 8080)
  --sync                      Enable WebSocket collaboration
  --cache-limit <N>           Max number of tracks cached locally
  --export-playlist <name>    Export the named playlist (M3U or JSON)
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

Full API details are available in the [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs).

---

## Architecture

`musix` centers on the Temporal Audio Routing Engine (TARE). Audio frames are decoded into isolated memory arenas and routed through virtual channels, giving the engine very low latency and predictable CPU usage even under heavy load. The WebSocket layer uses a lightweight protocol that pushes only minimal state to collaborators, keeping bandwidth consumption low.

---

## Contributing

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/your‑feature
   ```
2. Write unit tests.
3. Run the test suite: `mvn test`.
4. Open a pull request against `main`.

See the [CONTRIBUTING](CONTRIBUTING.md) file for detailed guidelines and the Code of Conduct.

---

## Changelog

- **v1.0.0** – Initial release: engine, collaborative playlists, offline caching, keyboard controls.

---

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
