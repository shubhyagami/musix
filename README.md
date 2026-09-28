[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# Musix

A lightweight Java 17+ library for deterministic, low‑latency audio playback.  
It ships a minimal Jetty‑based server that exposes the engine over HTTP and
supports real‑time playlist collaboration via WebSocket.

[![](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/projects/jdk/17)
[![](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)](https://github.com/shubhyagami/musix/actions/workflows/ci.yml)
[![](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)](https://github.com/shubhyagami/musix/actions/workflows/tests.yml)
[![](https://img.shields.io/codecov/c/github/shubhyagami/musix)](https://app.codecov.io/gh/shubhyagami/musix)
[![](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)](https://github.com/shubhyagami/musix/releases)
[![](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)](https://search.maven.org/artifact/com.github.shubhyagami/musix)
[![](https://img.shields.io/badge/License-MIT-brightgreen)](https://github.com/shubhyagami/musix/blob/main/LICENSE)

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build the demo JAR
mvn clean package

# Run the demo server
java -jar target/musix-1.0.0.jar
```

After the server starts:

* **HTTP API** – `http://localhost:8080`  
  (Health‑check at `/health`)

* **WebSocket** – `ws://localhost:8080/ws`

Use `--help` to see all command‑line options.

---

## Features

- Deterministic, low‑latency playback with sub‑second cross‑fades  
- Small memory footprint – suitable for embedded devices  
- In‑memory cache for decoded tracks (configurable size)  
- Export playlists to M3U or JSON  
- Extendable via an adaptive recommendation hook  
- Optional real‑time playlist collaboration over WebSocket  

---

## Requirements

| Item | Minimum version |
|------|----------------|
| Java | 17+ |
| Maven | 3.8+ (only required for building from source) |

---

## Library Usage

Add Musix to your project and use the `MusixEngine` to control playback programmatically.

### Maven

```xml
<dependency>
  <groupId>com.github.shubhyagami</groupId>
  <artifactId>musix</artifactId>
  <version>1.0.0</version>
</dependency>
```

### Gradle (Kotlin DSL)

```kotlin
implementation("com.github.shubhyagami:musix:1.0.0")
```

### Gradle (Groovy DSL)

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

Full API documentation is available in the generated Javadoc under
[`docs/`](https://github.com/shubhyagami/musix/tree/main/docs).

---

## Server Command‑Line Flags

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default: `8080`) |
| `--sync` | Enable real‑time playlist collaboration |
| `--cache-limit <N>` | Max number of decoded tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist to M3U or JSON |
| `--help` | Show this help message |

---

## Architecture

| Layer | Responsibility |
|-------|----------------|
| **Audio Engine** | Deterministic, low‑latency playback with cross‑fades |
| **WebSocket Layer** | Minimal‑state, real‑time playlist collaboration |
| **Jetty Server** | Self‑contained HTTP + WebSocket API exposing the engine |

---

## Contributing

We welcome contributions!

1. Fork the repo and create a feature branch  
   `git checkout -b feature/xxxx`
2. Make your changes and add tests that cover the new behaviour
3. Run `mvn test` locally – ensure everything passes
4. Submit a pull request against `main`

Additional guidelines are in `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

---

## Changelog

### 1.0.0 – 2026‑09‑07
- Initial public release
- Deterministic audio engine with sub‑second cross‑fades
- WebSocket‑based real‑time playlist collaboration
- Configurable in‑memory cache for decoded tracks
- Adaptive recommendation hook support
- Keyboard shortcuts in the demo server
- Playlist export to M3U and JSON

---

## License

[MIT](LICENSE) © 2026 Shubhyagami

---
