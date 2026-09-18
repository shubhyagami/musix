# Musix

A lightweight Java 17+ library for deterministic, low‑latency audio playback with real‑time playlist collaboration.  
An embedded Jetty server is bundled, exposing a simple HTTP/WebSocket API.

![Java](https://img.shields.io/badge/Java-17%2B-blue)
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)
![License](https://img.shields.io/badge/License-MIT-brightgreen)
![Maven Central](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)

---

## Quick start

    git clone https://github.com/shubhyagami/musix.git
    cd musix
    mvn clean package
    java -jar target/musix-1.0.0.jar

The demo server listens on **http://localhost:8080/** and exposes a health‑check page.  
The WebSocket endpoint is **ws://localhost:8080/ws**.  
Run `java -jar target/musix-1.0.0.jar --help` for a full list of options.

### Server options

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default 8080) |
| `--sync` | Enable real‑time playlist collaboration |
| `--cache-limit <N>` | Max number of decoded tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist as M3U or JSON |
| `--help` | Show this help message |

---

## Features

- Deterministic playback with sub‑second cross‑fades
- Extremely low CPU usage – suitable for embedded devices
- WebSocket‑based real‑time playlist collaboration with minimal state transfer
- Export playlists as M3U or JSON
- Configurable in‑memory cache for decoded tracks
- Optional adaptive recommendation hook
- Demo server includes keyboard shortcuts for common actions

---

## Library usage

### Maven

    <dependency>
        <groupId>com.github.shubhyagami</groupId>
        <artifactId>musix</artifactId>
        <version>1.0.0</version>
    </dependency>

### Gradle Kotlin DSL

    implementation("com.github.shubhyagami:musix:1.0.0")

### Gradle Groovy DSL

    implementation 'com.github.shubhyagami:musix:1.0.0'

### Example

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

The full API is documented in the Javadoc, available in the `docs` directory.

- **[API Reference](https://github.com/shubhyagami/musix/tree/main/docs)**

---

## Architecture

| Layer | Responsibility |
|-------|-----------------|
| **Audio Engine** | Deterministic, low‑latency playback with sub‑second cross‑fades |
| **WebSocket Layer** | Minimal‑state real‑time playlist collaboration |
| **Server** | Self‑contained Jetty HTTP + WebSocket listener exposing the API |

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository and create a feature branch (`git checkout -b feature/xxxx`).
2. Write or modify code, adding unit tests for any new or changed behaviour.
3. Run `mvn test` and ensure all tests pass.
4. Submit a pull request against the `main` branch.

Further guidelines are in `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

---

## Changelog

### v1.0.0 – 2026‑09‑07

- Initial release with deterministic audio engine  
- WebSocket‑based real‑time playlist collaboration  
- Configurable in‑memory cache for decoded tracks  
- Adaptive recommendation hook  
- Keyboard shortcuts and playlist export support

---

## License

MIT © 2026 Shubhyagami – see the `LICENSE` file.
