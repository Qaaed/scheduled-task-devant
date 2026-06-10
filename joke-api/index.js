import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/joke", async (req, res) => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    const joke = await response.json();

    if (joke.type === "single") {
      res.json({ type: "single", joke: joke.joke });
    } else {
      res.json({ type: "twopart", setup: joke.setup, delivery: joke.delivery });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Joke API running on port ${PORT}`);
});