import { useState } from "react";

const API_URL = "http://development-default.openchoreoapis.localhost:19080/joke-api-joke-endpoint";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError("Failed to fetch joke!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "40px", fontFamily: "monospace" }}>
      <h2>-- Joke App --</h2>
      <hr />
      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "fetching..." : "get joke"}
      </button>

      {error && <p>error: {error}</p>}

      {joke && (
        <div style={{ marginTop: "20px" }}>
          <hr />
          {joke.type === "single" ? (
            <p>{joke.joke}</p>
          ) : (
            <>
              <p>Q: {joke.setup}</p>
              <p>A: {joke.delivery}</p>
            </>
          )}
          <hr />
        </div>
      )}
    </div>
  );
}

export default App;