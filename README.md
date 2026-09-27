# Musix

A lightweight Java 17+ library for deterministic, low-latency audio playback. It also ships a minimal Jetty-based server that exposes the engine over HTTP and supports real-time playlist collaboration via WebSocket.

[![](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/projects/jdk/17) [![](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)](https://github.com/shubhyagami/musix/actions/workflows/ci.yml) [![](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)](https://github.com/shubhyagami/musix/actions/workflows/tests.yml) [![](https://img.shields.io/codecov/c/github/shubhyagami/musix)](https://app.codecov.io/gh/shubhyagami/musix) [![](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)](https://github.com/shubhyagami/musix/releases) [![](https://img.shields.io/badge/License-MIT-brightgreen)](https://github.com/shubhyagami/musix/blob/main/LICENSE) [![](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)](https://search.maven.org/artifact/com.github.shubhyagami/musix)

## Features

- Deterministic, low-latency playback with sub-second cross-fades
- Low CPU footprint, suitable for embedded devices
- Optional in-memory cache for decoded tracks
- Playlist export to M3U or JSON
- Extendable via an adaptive recommendation hook

## Requirements

- Java 17 or newer
- Maven 3.8+ (only needed to build from source)

## Getting Started

Clone the repository and build the library and demo JAR:

```bash
git clone https://github.com/shubhyagami/musix.git
cd musix
mvn clean package
```

Run the bundled demo server:

```bash
java -jar target/musix-1.0.0.jar
```

- HTTP server: `http://localhost:8080` (health-check page at `/health`)
- WebSocket endpoint: `ws://localhost:8080/ws`

Run `java -jar target/musix-1.0.0.jar --help` to see all available options.

### Server flags

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default: `8080`) |
| `--sync` | Enable real-time playlist collaboration |
| `--cache-limit <N>` | Maximum number of decoded tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist as M3U or JSON |
| `--help` | Show the help message |

## Library Usage

Add Musix to your project and use the `MusixEngine` to control playback programmatically.

**Maven**

```xml
<dependency>
    <groupId>com.github.shubhyagami</groupId>
    <artifactId>musix</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Gradle (Kotlin DSL)**

```kotlin
implementation("com.github.shubhyagami:musix:1.0.0")
```

**Gradle (Groovy DSL)**

```groovy
implementation 'com.github.shubhyagami:musix:1.0.0'
```

### Example

```java
import com.shubhyagami.musix.MusixEngine;

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

The full API is documented in the Javadoc under [`docs/`](https://github.com/shubhyagami/musix/tree/main/docs).

## Architecture

| Layer | Responsibility |
|-------|----------------|
| **Audio Engine** | Deterministic, low-latency playback with cross-fades |
| **WebSocket Layer** | Minimal-state, real-time playlist collaboration |
| **Jetty Server** | Self-contained HTTP + WebSocket API exposing the engine |

## Contributing

Contributions are welcome!

1. Fork the repository and create a feature branch: `git checkout -b feature/xxxx`
2. Implement your change and add tests covering the new or modified behavior
3. Run `mvn test` and make sure all tests pass locally
4. Open a pull request against `main`

Additional guidelines are documented in `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

## Changelog

### 1.0.0 – 2026-09-07
- Initial public release
- Deterministic audio engine with sub-second cross-fades
- WebSocket-based real-time playlist collaboration
- Configurable in-memory cache for decoded tracks
- Adaptive recommendation hook support
- Keyboard shortcuts in the demo server
- Playlist export to M3U and JSON

## License

[MIT](LICENSE) © 2026 Shubhyagami
