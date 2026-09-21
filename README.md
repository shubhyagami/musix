# Musix

A lightweight Java 17+ library that delivers deterministic, low‑latency audio playback while offering a minimal Jetty‑based server for real‑time playlist collaboration over WebSocket.

> **Why Musix?**  
> • Predictable timing down to sub‑second cross‑fades  
> • Extremely low CPU usage – great for embedded devices  
> • Optional in‑memory cache of decoded tracks  
> • Export playlists as M3U or JSON  
> • Extendable with an adaptive recommendation hook  

---

## Badges

[![][java]][java-url] [![][build]][build-url] [![][tests]][tests-url] [![][coverage]][coverage-url] [![][release]][release-url] [![][license]][license-url] [![][maven]][maven-url]

[java]: https://img.shields.io/badge/Java-17%2B-blue
[build]: https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/ci.yml?branch=main&label=build
[tests]: https://img.shields.io/github/actions/workflow/status/shubhyagami/musix/tests.yml?branch=main&label=tests
[coverage]: https://img.shields.io/codecov/c/github/shubhyagami/musix
[release]: https://img.shields.io/github/v/release/shubhyagami/musix?label=release
[license]: https://img.shields.io/badge/License-MIT-brightgreen
[maven]: https://img.shields.io/maven-central/v/com.github.shubhyagami/musix?style=flat&label=Maven%20Central

[java-url]: https://openjdk.org/projects/jdk/17
[build-url]: https://github.com/shubhyagami/musix/actions/workflows/ci.yml
[tests-url]: https://github.com/shubhyagami/musix/actions/workflows/tests.yml
[coverage-url]: https://app.codecov.io/gh/shubhyagami/musix
[release-url]: https://github.com/shubhyagami/musix/releases
[license-url]: https://github.com/shubhyagami/musix/blob/main/LICENSE
[maven-url]: https://search.maven.org/artifact/com.github.shubhyagami/musix

---

## Quick start

```bash
git clone https://github.com/shubhyagami/musix.git
cd musix

# Build the library and the demo JAR
mvn clean package

# Run the bundled demo server
java -jar target/musix-1.0.0.jar
```

The server listens on **http://localhost:8080/**.  
*A simple health‑check page is available at `/health`.*  
The WebSocket endpoint is **ws://localhost:8080/ws**.

Run `java -jar target/musix-1.0.0.jar --help` to see all available options.

### Server flags

| Flag | Description |
|------|-------------|
| `--port <p>` | HTTP/WebSocket port (default `8080`) |
| `--sync` | Enable real‑time playlist collaboration |
| `--cache-limit <N>` | Max number of decoded tracks kept in memory |
| `--export-playlist <name>` | Export the named playlist as M3U or JSON |
| `--help` | Show this help message |

---

## Library usage

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

The full API is documented in the Javadoc available in the `docs` directory.

- **[API Reference →](https://github.com/shubhyagami/musix/tree/main/docs)**

---

## Architecture

| Layer | Responsibility |
|-------|----------------|
| **Audio Engine** | Deterministic, low‑latency playback with cross‑fades |
| **WebSocket Layer** | Minimal‑state real‑time playlist collaboration |
| **Jetty Server** | Self‑contained HTTP + WebSocket API exposing the engine |

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository and create a feature branch: `git checkout -b feature/xxxx`.
2. Implement your change and add tests that cover the new or modified behavior.
3. Run `mvn test` to verify all tests pass locally.
4. Submit a pull request against the `main` branch.

Additional guidelines are documented in `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

---

## Changelog

### v1.0.0 – 2026‑09‑07
- Initial public release  
- Deterministic audio engine with sub‑second cross‑fades  
- WebSocket‑based real‑time playlist collaboration  
- Configurable in‑memory cache for decoded tracks  
- Adaptive recommendation hook support  
- Keyboard shortcuts in demo server  
- Playlist export to M3U and JSON

---

## License

MIT © 2026 Shubhyagami – see the `LICENSE` file.
