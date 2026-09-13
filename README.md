# Musix

A lightweight Java library and embedded Jetty server designed for deterministic, low‑latency audio playback and real‑time playlist collaboration over WebSocket.

> **Getting started** – see the sections below for a quick guide.

---

## Features

- Deterministic audio engine with sub‑second cross‑fades and minimal CPU usage  
- WebSocket‑based playlist collaboration – only the minimal state is transmitted  
- Export playlists as M3U or JSON  
- Local cache of decoded tracks with configurable size  
- Optional adaptive recommendations  
- Keyboard shortcuts for common actions  

---

## Badges

![Java](https://img.shields.io/badge/Java-17%2B-blue)  
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)  
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)  
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)  
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)  
![License](https://img.shields.io/badge/License-MIT-brightgreen)  
![Maven Central](https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central)  

---

## Table of contents

- [Installation](#installation)
  - [As a standalone server](#standalone-server)
  - [As a dependency](#dependency)
- [Quick start](#quick-start)
- [Server usage](#using-the-server)
  - [Endpoints](#endpoints)
- [Library usage](#using-musix-as-a-library)
  - [Example](#example-usage)
- [Command‑line options](#command-line-options)
- [API overview](#api-overview)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Installation

### As a standalone server

```bash
# 1. Clone the repo
git clone https://github.com/shubhyagami/musix.git
cd musix

# 2. Build the JAR
mvn clean package

# 3. Run the demo server
java -jar target/musix-1.0.0.jar
```

The server is bundled with a simple health‑check page and a WebSocket endpoint.  
Run `java -jar target/musix-1.0.0.jar --help` to list all available command‑line options.

### As a dependency

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

---

## Quick start

```bash
# Build the executable JAR
mvn clean package

# Run the demo server (defaults to http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

---

## Using the server

```bash
# Build the JAR
mvn clean package

# Start the server on port 8080 with collaboration enabled
java -jar target/musix-1.0.0.jar --port 8080 --sync
```

### Endpoints

| URL | Purpose |
|-----|---------|
| `http://<host>:<port>/` | Simple health‑check page |
| `ws://<host>:<port>/ws` | WebSocket for playlist collaboration |

---

## Using Musix as a library

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

Full Javadoc is available in the `docs` directory of the repository:  
https://github.com/shubhyagami/musix/tree/main/docs

---

## Command‑line options

```
Usage: musix-<version>.jar [options]

Options:
  --help                     Show help and exit
  --port <p>                 Port number (default: 8080)
  --sync                     Enable WebSocket collaboration
  --cache-limit <N>          Max number of tracks to keep in local memory
  --export-playlist <name>   Export the named playlist (M3U or JSON)
```

---

## API overview (selected members)

| Method | Description |
|--------|-------------|
| `loadPlaylist(String path)` | Load an M3U or JSON playlist |
| `play()` | Start playback |
| `pause()` | Pause playback |
| `stop()` | Stop playback |
| `setShuffle(boolean)` | Toggle shuffle mode |
| `addListener(Consumer<Event>)` | Register a callback for playback events |
| `exportPlaylist(String name)` | Export the current playlist as M3U or JSON |

See the Javadoc for the complete API.

---

## Architecture

- **Audio engine** – deterministic, sub‑second cross‑fade, low CPU usage; tracks are decoded into isolated memory arenas.  
- **WebSocket layer** – sends only the minimal state required for collaboration, keeping traffic light.  
- **Server** – a self‑contained Jetty HTTP + WebSocket listener that exposes the API.

---

## Contributing

Pull requests are welcome. Please follow these steps:

1. Fork the repository and create a new feature branch (`git checkout -b feature/your-feature`).  
2. Write unit tests for the changes.  
3. Run the test suite (`mvn test`) and ensure all tests pass.  
4. Push your branch and create a pull request targeting `main`.

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
