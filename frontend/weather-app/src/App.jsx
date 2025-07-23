import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
    const response = await fetch(`http://127.0.0.1:8000/api/weather/?city=${city}`);

      const data = await response.json();

      if (data.error) {
        setError("City not found. Please try again.");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Failed to fetch weather. Try again later.");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>🌤️ Weather Forecast</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}</h2>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Description:</strong> {weather.description}</p>
          <p><strong>Time:</strong> {weather.datetime}</p>
        </div>
      )}
    </div>
  );
}

export default App;
