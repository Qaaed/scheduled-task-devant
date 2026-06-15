import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    //const response = await fetch("https://v2.jokeapi.dev/invalid-endpoint-break");
    const joke = await response.json();

    if (joke.type === "single") {
      res.json({ type: "single", joke: joke.joke });
    } else {
      res.json({ type: "twopart", setup: joke.setup, delivery: joke.delivery });
    }
  } catch (err) {
    // This line prints the full error stack to your logs
    console.error("Error fetching joke from external API:", err);

    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Memory leak simulator: each call allocates +10MB that is never freed
const memoryHog = [];
app.get("/leak", (req, res) => {
  const buf = Buffer.allocUnsafe(10 * 1024 * 1024); // +10MB per call
  buf.fill(1); // <-- touch every byte so it's actually resident in RAM
  memoryHog.push(buf);
  res.json({ chunks: memoryHog.length, allocatedMB: memoryHog.length * 10 });
});

app.listen(PORT, () => {
  console.log(`Joke API running on port ${PORT}`);
});