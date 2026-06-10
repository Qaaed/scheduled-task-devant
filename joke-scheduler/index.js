import fetch from "node-fetch";

// How often to fetch a joke (in minutes)
const INTERVAL_MINUTES = 1;

async function fetchJoke() {
  const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode"); // api we get the jokes from
  const data = await response.json();
  return data;
}

function getTimestamp() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

async function logJoke() {
  try {
    const joke = await fetchJoke();

    console.log(`Joke at ${getTimestamp()}`);

    if (joke.type === "single") {
      console.log("", joke.joke);
    } else if (joke.type === "twopart") {
      console.log("part 1", joke.setup);
      console.log("part 2", joke.delivery);
    } else {
      console.log("joke failed to pass");
    }

  } catch (err) {
    console.error("Failed to fetch joke:", err.message);
  }
}

// Run immediately on start, then on interval
console.log("Joke Scheduler started!");
console.log(`Fetching a joke every ${INTERVAL_MINUTES} minute(s)...`);
console.log("Press Ctrl+C to stop.\n");

logJoke();
setInterval(logJoke, INTERVAL_MINUTES * 60 * 1000);