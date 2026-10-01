[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# Musix

A lightweight, deterministic audio playback library for Java 17+.  
It ships its own Jetty server that exposes HTTP and WebSocket APIs, making real‑time playlist collaboration trivial. Ideal for embedded devices or cloud‑friendly environments.

[![Java 17+](https://img.shields.io/badge/Java-17%2B-blue)](https://openjdk.org/projects/jdk/17)
[![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)](https://github.com/shubhyagami/musix/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)](https://github.com/shubhyagami/musix/actions/workflows/tests.yml)
[![Codecov](https://img.shields.io/codecov/c/github/shubhyagami/musix)](https://app.codecov.io/gh/shubhyagami/musix)
[![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)](https://github.com/shubhyagami/musix/releases)
[![Maven Central](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)](https://search.maven.org/artifact/com.github.shubhyagami/musix)
[![License](https://img.shields.io/badge/License-MIT-brightgreen)](https://github.com/shubhyagami/musix/blob/main/LICENSE)

---

## Features

- Deterministic, low‑latency playback with sub‑second cross‑fades  
- Minimal memory footprint – great for embedded or low‑resource environments  
- In‑memory cache for decoded tracks (configurable size)  
- Export playlists to M3U or JSON  
- Extendable recommendation hook  
- Optional real‑time playlist collaboration over WebSocket

---

## Getting Started

### Clone & Build

    git clone https://github.com/shubhyagami/musix.git
    cd musix
    mvn clean package

### Run the Demo Server

    java -jar target/musix-1.0.0.jar

The server listens on `http://localhost:8080`.

* **Health‑check** – `http://localhost:8080/health`  
* **WebSocket** – `ws://localhost:8080/ws`

Use `--help` to explore available command‑line flags.

### Library Integration

Add Musix as a dependency and use `MusixEngine` to control playback programmatically.

#### Maven

    <dependency>
      <groupId>com.github.shubhyagami</groupId>
      <artifactId>musix</artifactId>
      <version>1.0.0</version>
    </dependency>

#### Gradle (Kotlin DSL)

    implementation("com.github.shubhyagami:musix:1.0.0")

#### Gradle (Groovy DSL)

    implementation 'com.github.shubhyagami:musix:1.0.0'

#### Usage Example

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

Full API documentation is generated in the `docs/` directory.

---

## Server Command‑Line Flags

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default: `8080`) |
| `--sync` | Enable real‑time playlist collaboration |
| `--cache-limit <N>` | Max number of decoded tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist to M3U or JSON |
| `--help` | Show help message |

---

## Architecture

| Layer | Responsibility |
|-------|-----------------|
| **Audio Engine** | Deterministic playback with cross‑fades |
| **WebSocket Layer** | Minimal‑state, real‑time collaboration |
| **Jetty Server** | HTTP + WebSocket API serving the engine |

---

## Requirements

| Item | Minimum version |
|------|-----------------|
| Java | 17+ |
| Maven | 3.8+ (only when building from source) |

---

## Changelog

### 1.0.0 – 2026‑09‑07
- Initial public release  
- Deterministic audio engine with sub‑second cross‑fades  
- WebSocket‑based real‑time playlist collaboration  
- Configurable in‑memory cache for decoded tracks  
- Adaptive recommendation hook support  
- Keyboard shortcuts in demo server  
- Playlist export to M3U and JSON

---

## Contributing

We welcome contributions!

1. Fork the repo and create a feature branch  
   `git checkout -b feature/xxxx`  
2. Add tests for new functionality  
3. Run `mvn test` – ensure everything passes  
4. Submit a pull request against `main`

Additional guidelines are in `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

---

## License

MIT © 2026 Shubhyagami

---
