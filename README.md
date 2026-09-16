# Musix

Deterministic, low‑latency audio playback with real‑time playlist collaboration.  
A lightweight Java library plus an embedded Jetty server that exposes a simple HTTP/​WebSocket API.

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![License](https://img.shields.io/badge/License-MIT-brightgreen)  
![Maven Central](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)

## Features

- Deterministic playback with sub‑second cross‑fades  
- Very low CPU usage – suitable for embedded systems  
- WebSocket‑based playlist collaboration with minimal state transfer  
- Export playlists as M3U or JSON  
- Configurable in‑memory cache for decoded tracks  
- Optional adaptive recommendation hook  
- Keyboard shortcuts for common actions in the demo server

## Getting Started

### Prerequisites

* Java 17 or newer  
* Maven 3.8+ (only if you build from source)

### Run the bundled demo server

```bash
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
java -jar target/musix-1.0.0.jar
```

The server listens on `http://localhost:8080/` and exposes a health‑check page.  
WebSocket endpoint: `ws://localhost:8080/ws`.  
Use `java -jar target/musix-1.0.0.jar --help` to see all command‑line options.

#### Server options

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default 8080) |
| `--sync` | Enable real‑time playlist collaboration |
| `--cache-limit <N>` | Max number of tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist as M3U or JSON |
| `--help` | Show help message |

## Using Musix as a Library

Add the library to your project.

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

### Example

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

Full API documentation is in the `docs` directory:  
[docs](https://github.com/shubhyagami/musix/tree/main/docs)

## API Overview (selected)

| Method | Purpose |
|--------|---------|
| `loadPlaylist(String)` | Load an M3U or JSON playlist |
| `play()` | Start playback |
| `pause()` | Pause playback |
| `stop()` | Stop playback |
| `setShuffle(boolean)` | Toggle shuffle mode |
| `addListener(Consumer<Event>)` | Register a callback for playback events |
| `exportPlaylist(String)` | Export the current playlist as M3U or JSON |

See the Javadoc for detailed usage.

## Architecture

| Layer | Responsibility |
|-------|----------------|
| **Audio Engine** | Deterministic, low‑latency playback with sub‑second cross‑fades |
| **WebSocket Layer** | Minimal‑state real‑time collaboration |
| **Server** | Self‑contained Jetty HTTP + WebSocket listener exposing the API |

## Contributing

We welcome contributions!  
1. Fork the repo and create a feature branch (`git checkout -b feature/xxxx`).  
2. Add unit tests for new behaviour.  
3. Run `mvn test` and ensure all tests pass.  
4. Submit a pull request to `main`.  

Additional guidelines are in [`CONTRIBUTING.md`](CONTRIBUTING.md) and the Code of Conduct.

## Changelog

### v1.0.0 – 2026‑09‑07

- Initial release
- Deterministic low‑latency audio engine
- WebSocket‑based playlist collaboration
- Configurable local cache
- Adaptive recommendation hook
- Keyboard shortcuts and export support

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
