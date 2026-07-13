package com.coderunner.service;

import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class YouTubeService {

    private final HttpClient client = HttpClient.newHttpClient();

    @Value("${rapidapi.key}")
    private String rapidApiKey;

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> search(String query) throws Exception {
        String encoded = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = "https://www.youtube.com/results?search_query=" + encoded;

        HttpRequest req = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .header("Accept-Language", "en-US,en;q=0.5")
            .GET()
            .build();

        HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString());
        String body = res.body();

        List<Map<String, String>> results = new ArrayList<>();

        // Try to extract ytInitialData JSON by counting braces
        String json = null;
        String marker = "ytInitialData";
        int idx = body.indexOf(marker);
        if (idx >= 0) {
            int start = body.indexOf('{', idx);
            if (start >= 0) {
                int depth = 0;
                int end = start;
                for (int i = start; i < body.length(); i++) {
                    char c = body.charAt(i);
                    if (c == '{') depth++;
                    else if (c == '}') {
                        depth--;
                        if (depth == 0) { end = i; break; }
                    }
                }
                if (end > start) {
                    json = body.substring(start, end + 1);
                }
            }
        }

        if (json != null) {
            // Unescape common JSON escapes from YouTube
            json = json.replace("\\x26", "&").replace("\\u0026", "&").replace("\\/", "/");
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                Map<String, Object> root = mapper.readValue(json, Map.class);

                // Navigate to video contents
                Map<String, Object> contents = (Map<String, Object>) root.get("contents");
                if (contents == null) return results;
                Map<String, Object> twoCol = (Map<String, Object>) contents.get("twoColumnSearchResultsRenderer");
                if (twoCol == null) return results;
                Map<String, Object> primary = (Map<String, Object>) twoCol.get("primaryContents");
                if (primary == null) return results;
                Map<String, Object> sectionList = (Map<String, Object>) primary.get("sectionListRenderer");
                if (sectionList == null) return results;
                List<Object> sections = (List<Object>) sectionList.get("contents");
                if (sections == null || sections.isEmpty()) return results;

                for (Object section : sections) {
                    Map<String, Object> sectionMap = (Map<String, Object>) section;
                    Map<String, Object> itemSection = (Map<String, Object>) sectionMap.get("itemSectionRenderer");
                    if (itemSection == null) continue;
                    List<Object> items = (List<Object>) itemSection.get("contents");
                    if (items == null) continue;

                    for (Object item : items) {
                        Map<String, Object> itemMap = (Map<String, Object>) item;
                        Map<String, Object> vidRenderer = (Map<String, Object>) itemMap.get("videoRenderer");
                        if (vidRenderer == null) continue;

                        String videoId = (String) vidRenderer.get("videoId");
                        if (videoId == null) continue;

                        // Extract title
                        Map<String, Object> titleObj = (Map<String, Object>) vidRenderer.get("title");
                        String title = "";
                        if (titleObj != null) {
                            List<Object> runs = (List<Object>) titleObj.get("runs");
                            if (runs != null && !runs.isEmpty()) {
                                StringBuilder sb = new StringBuilder();
                                for (Object run : runs) {
                                    Map<String, Object> runMap = (Map<String, Object>) run;
                                    String text = (String) runMap.get("text");
                                    if (text != null) sb.append(text);
                                }
                                title = sb.toString();
                            } else {
                                String simple = (String) titleObj.get("simpleText");
                                if (simple != null) title = simple;
                            }
                        }
                        if (title.isEmpty()) title = "Unknown";

                        // Skip duplicates
                        boolean dup = false;
                        for (var r : results) {
                            if (r.get("videoId").equals(videoId)) { dup = true; break; }
                        }
                        if (dup) continue;

                        Map<String, String> entry = new LinkedHashMap<>();
                        entry.put("videoId", videoId);
                        entry.put("title", title);
                        entry.put("thumbnail", "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg");
                        results.add(entry);
                        if (results.size() >= 20) return results;
                    }
                }
            } catch (Exception e) {
                // JSON parsing failed, fall through to simple regex
            }
        }

        // Fallback: simple regex approach
        if (results.isEmpty()) {
            Pattern idPat = Pattern.compile("\"videoId\":\"([^\"]+)\"");
            Pattern titlePat = Pattern.compile("\"text\":\"([^\"]+)\"");
            List<String> ids = new ArrayList<>();
            Matcher idMatcher = idPat.matcher(body);
            while (idMatcher.find()) {
                String vid = idMatcher.group(1);
                if (!ids.contains(vid)) ids.add(vid);
                if (ids.size() >= 20) break;
            }
            List<String> titles = new ArrayList<>();
            Matcher titleMatcher = titlePat.matcher(body);
            while (titleMatcher.find()) {
                String t = titleMatcher.group(1);
                if (!titles.contains(t)) titles.add(t);
                if (titles.size() >= 20) break;
            }
            for (int i = 0; i < ids.size(); i++) {
                Map<String, String> item = new LinkedHashMap<>();
                item.put("videoId", ids.get(i));
                item.put("title", i < titles.size() ? titles.get(i) : "Unknown");
                item.put("thumbnail", "https://i.ytimg.com/vi/" + ids.get(i) + "/hqdefault.jpg");
                results.add(item);
            }
        }
        return results;
    }

    public Map<String, Object> getDownloadInfo(String videoId) throws Exception {
        String url = "https://youtube-mp36.p.rapidapi.com/dl?id=" + videoId;

        HttpRequest req = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("x-rapidapi-host", "youtube-mp36.p.rapidapi.com")
            .header("x-rapidapi-key", rapidApiKey)
            .header("Content-Type", "application/json")
            .GET()
            .build();

        HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString());

        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        Map<String, Object> result = mapper.readValue(res.body(), Map.class);
        return result;
    }

    public Path downloadAndSave(String videoId) throws Exception {
        // Get download URL from RapidAPI
        Map<String, Object> info = getDownloadInfo(videoId);
        String dlUrl = (String) info.get("link");
        if (dlUrl == null || dlUrl.isEmpty()) {
            // Try alternative field names
            dlUrl = (String) info.get("url");
        }
        if (dlUrl == null || dlUrl.isEmpty()) {
            throw new RuntimeException("No download URL in API response: " + info);
        }

        // Ensure music directory exists
        Path musicDir = Paths.get("music");
        Files.createDirectories(musicDir);

        // Download the MP3 file
        Path outPath = musicDir.resolve(videoId + ".mp3");
        HttpRequest dlReq = HttpRequest.newBuilder()
            .uri(URI.create(dlUrl))
            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .GET()
            .build();

        HttpResponse<InputStream> dlRes = client.send(dlReq, HttpResponse.BodyHandlers.ofInputStream());
        try (InputStream in = dlRes.body()) {
            Files.copy(in, outPath, StandardCopyOption.REPLACE_EXISTING);
        }

        return outPath;
    }
}
