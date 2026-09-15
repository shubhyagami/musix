# Musix

A compact Java library and Jetty‑based server that delivers deterministic, low‑latency audio playback with real‑time playlist collaboration over WebSocket.

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![License](https://img.shields.io/badge/License-MIT-brightgreen)  
![Maven Central](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)

---

## Features

- Deterministic audio engine with sub‑second cross‑fades and low CPU usage  
- WebSocket‑based playlist collaboration, transmitting only minimal state  
- Export playlists as M3U or JSON  
- Configurable in‑memory cache of decoded tracks  
- Optional adaptive recommendations  
- Keyboard shortcuts for common actions  

---

## Getting Started

```bash
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
java -jar target/musix-1.0.0.jar
```

The demo server starts on `http://localhost:8080/` with a health‑check page.  
The WebSocket endpoint is `ws://localhost:8080/ws`.  
Run `java -jar target/musix-1.0.0.jar --help` for a full list of command‑line options.

### Server Configuration

```bash
java -jar target/musix-1.0.0.jar --port 8080 --sync
```

- `--port <p>` – set the HTTP/WebSocket port (default 8080)  
- `--sync` – enable real‑time playlist collaboration  
- `--cache-limit <N>` – maximum number of tracks kept in memory  
- `--export-playlist <name>` – export the named playlist as M3U or JSON  

---

## Using Musix as a Library

```java
import com.shubhyagami.musix.MusixEngine;
import com.shubhyagami.musix.event.Event;

public class Demo {
    public static void main(String[] args) {
        MusixEngine engine = new MusixEngine();
        engine.loadPlaylist("my_playlist.m3u");
        engine.setShuffle(true);
        engine.addListener(e -> System.out.println("Event: " + e));
        engine.play();
    }
}
```

Add it as a dependency:

```xml
<!-- Maven -->
<dependency>
  <groupId>com.github.shubhyagami</groupId>
  <artifactId>musix</artifactId>
  <version>1.0.0</version>
</dependency>
```

```kotlin
// Gradle Kotlin DSL
implementation("com.github.shubhyagami:musix:1.0.0")
```

```groovy
// Gradle Groovy DSL
implementation 'com.github.shubhyagami:musix:1.0.0'
```

Full Javadoc is available in the `docs` directory:  
[docs](https://github.com/shubhyagami/musix/tree/main/docs)

---

## API Overview (selected)

| Method | Purpose |
|--------|---------|
| `loadPlaylist(String path)` | Load an M3U or JSON playlist |
| `play()` | Start playback |
| `pause()` | Pause playback |
| `stop()` | Stop playback |
| `setShuffle(boolean)` | Toggle shuffle mode |
| `addListener(Consumer<Event>)` | Register a callback for playback events |
| `exportPlaylist(String name)` | Export the current playlist as M3U or JSON |

See the Javadoc for the full API.

---

## Architecture

| Layer | Responsibility |
|-------|-----------------|
| Audio Engine | Deterministic playback, sub‑second cross‑fades, isolated memory arenas |
| WebSocket Layer | Minimal‑state transmission for real‑time collaboration |
| Server | Self‑contained Jetty HTTP + WebSocket listener exposing the API |

---

## Contributing

Pull requests are welcome. Please:

1. Fork the repository and create a feature branch (`git checkout -b feature/your-feature`).  
2. Write unit tests for the changes.  
3. Run `mvn test` and verify all tests pass.  
4. Submit a pull request against the `main` branch.

Additional guidelines are in [`CONTRIBUTING.md`](CONTRIBUTING.md) and the Code of Conduct.

---

## Changelog

### v1.0.0 – 2026‑09‑07

- Initial release
- Deterministic low‑latency engine
- WebSocket‑based playlist collaboration
- Configurable local cache
- Adaptive recommendations
- Keyboard shortcuts and export support

---

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
