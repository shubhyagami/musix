# Musix

Musix is a lightweight Java library and embedded Jetty server that delivers deterministic, low‑latency audio playback and real‑time playlist collaboration over WebSocket.

---

## Badges

![Java](https://img.shields.io/badge/Java-17%2B-blue)
![Build](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build)
![Tests](https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests)
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/musix)
![Release](https://img.shields.io/github/v/release/shubhyagami/musix?label=release)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

---

## Quick start

```bash
# Clone the repo
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build the JAR
mvn clean package

# Run the demo server (default: http://localhost:8080)
java -jar target/musix-1.0.0.jar
```

Run `java -jar target/musix-1.0.0.jar --help` to view all command‑line options.

---

## Getting started

### 1️⃣ Run the server locally

```bash
# Build first
mvn clean package

# Start
java -jar target/musix-1.0.0.jar --port 8080 --sync
```

The server exposes:

- `http://<host>:<port>/` – a simple health‑check page.
- `ws://<host>:<port>/ws` – WebSocket endpoint for playlist collaboration.

### 2️⃣ Use Musix as a library

Add one of the following snippets to your project:

> **Maven**

```xml
<dependency>
  <groupId>com.github.shubhyagami</groupId>
  <artifactId>musix</artifactId>
  <version>1.0.0</version>
</dependency>
```

> **Gradle (Kotlin DSL)**

```kotlin
implementation("com.github.shubhyagami:musix:1.0.0")
```

> **Gradle (Groovy DSL)**

```groovy
implementation 'com.github.shubhyagami:musix:1.0.0'
```

**Example usage**

```java
import com.shubhyagami.musix.MusixEngine;
import com.shubhyagami.musix.event.Event;

public class Demo {
    public static void main(String[] args) {
        MusixEngine engine = new MusixEngine();
        engine.loadPlaylist("my_playlist.m3u");
        engine.setShuffle(true);
        engine.addListener((Event e) -> System.out.println("Event: " + e));
        engine.play();
    }
}
```

Full API documentation is available in the generated [Javadoc](https://github.com/shubhyagami/musix/tree/main/docs).

---

## Command‑line options

```text
Usage: musix-<version>.jar [options]

Options:
  --help                     Show help and exit
  --port <p>                 Port number (default: 8080)
  --sync                     Enable WebSocket collaboration
  --cache-limit <N>          Max number of tracks to keep in local memory
  --export-playlist <name>   Export named playlist (M3U or JSON)
```

---

## Core API

| Method                           | Description                                          |
|----------------------------------|------------------------------------------------------|
| `loadPlaylist(String path)`      | Load an M3U or JSON playlist                         |
| `play()`                         | Start playback                                        |
| `pause()`                        | Pause playback                                       |
| `stop()`                         | Stop playback                                        |
| `setShuffle(boolean)`             | Toggle shuffle mode                                  |
| `addListener(Consumer<Event>)`    | Register a callback for playback events              |
| `exportPlaylist(String name)`    | Export the current playlist as M3U or JSON           |

For additional methods and event types, refer to the Javadoc.

---

## Architecture

- **Audio engine** – deterministic, sub‑second cross‑fade and low CPU usage; tracks are decoded into isolated memory arenas.
- **WebSocket layer** – transmits only the state needed for collaboration, keeping traffic minimal.
- **Server** – a self‑contained Jetty HTTP + WebSocket listener that serves the client API.

---

## Contributing

Pull requests are welcome. Please follow these steps:

1. Fork the repository and create a feature branch (`git checkout -b feature/your-feature`).
2. Write unit tests for your changes.
3. Run the test suite (`mvn test`).
4. Push your branch and create a pull request to `main`.

See the full guidelines in [CONTRIBUTING.md](CONTRIBUTING.md) and the Code of Conduct.

---

## Changelog

### v1.0.0 – 2026-09-07

- Initial release
- Deterministic low‑latency engine
- WebSocket‑based playlist collaboration
- Local cache with configurable size
- Adaptive recommendations
- Keyboard shortcuts and export support

---

## License

MIT © 2026 Shubhyagami – see the [LICENSE](LICENSE) file.
