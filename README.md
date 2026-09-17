# Musix

Deterministic, low‑latency audio playback with real‑time playlist collaboration.  
A lightweight Java 17+ library that comes bundled with an embedded Jetty server exposing a simple HTTP/​WebSocket API.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://www.oracle.com/java/)
[![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)](https://github.com/shubhyagami/musix/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)](https://github.com/shubhyagami/musix/actions/workflows/tests.yml)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)](https://app.codecov.io/gh/shubhyagami/musix)
[![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)](https://github.com/shubhyagami/musix/releases)
[![License](https://img.shields.io/badge/License-MIT-brightgreen)](LICENSE)
[![Maven Central](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)](https://repo1.maven.org/maven2/com/github/shubhyagami/musix/)

---

## Quick start

```bash
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
java -jar target/musix-1.0.0.jar
```

The demo server listens on **`http://localhost:8080/`** and exposes a health‑check page.  
WebSocket endpoint: **`ws://localhost:8080/ws`**.  
Run `java -jar target/musix-1.0.0.jar --help` for a list of options.

### Server options

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default 8080) |
| `--sync` | Enable real‑time playlist collaboration |
| `--cache-limit <N>` | Max number of tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist as M3U or JSON |
| `--help` | Show help message |

---

## Features

- Deterministic playback with sub‑second cross‑fades  
- Extremely low CPU usage (ideal for embedded devices)  
- WebSocket‑based real‑time playlist collaboration with minimal state transfer  
- Export playlists to M3U or JSON  
- Configurable in‑memory cache for decoded tracks  
- Optional adaptive recommendation hook  
- Demo server includes keyboard shortcuts for common actions  

---

## Library usage

Add Musix to your project with the following dependency.

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

The complete API is documented in the Javadoc and can be found in the `docs` directory.

- **[API Reference](https://github.com/shubhyagami/musix/tree/main/docs)**

---

## Selected API overview

| Method | Purpose |
|--------|---------|
| `loadPlaylist(String)` | Load an M3U or JSON playlist |
| `play()` | Start playback |
| `pause()` | Pause playback |
| `stop()` | Stop playback |
| `setShuffle(boolean)` | Toggle shuffle mode |
| `addListener(Consumer<Event>)` | Register a callback for playback events |
| `exportPlaylist(String)` | Export the current playlist as M3U or JSON |

---

## Architecture

| Layer | Responsibility |
|-------|-----------------|
| **Audio Engine** | Deterministic, low‑latency playback with sub‑second cross‑fades |
| **WebSocket Layer** | Minimal state real‑time collaboration |
| **Server** | Self‑contained Jetty HTTP + WebSocket listener exposing the API |

---

## Contributing

We welcome contributions!  
1. Fork the repo and create a feature branch (`git checkout -b feature/xxxx`).  
2. Add unit tests for any new or changed behaviour.  
3. Run `mvn test` and ensure all tests pass.  
4. Submit a pull request against `main`.  

Additional guidelines are in [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

---

## Changelog

### v1.0.0 – 2026‑09‑07

- Initial release with deterministic audio engine  
- WebSocket‑based playlist collaboration  
- Configurable in‑memory cache  
- Adaptive recommendation hook  
- Keyboard shortcuts and playlist export support

---

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
