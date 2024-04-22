import React, { useState, useEffect } from "react";

// components
import { Weather } from "./components/Weather";
import Input from "./components/Input";

// const React = require("react");

export default function App() {
  // set our state
  const [location, setLocation] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  useEffect(
    function () {
      async function fetchWeather() {
        if (location.length < 2) return setWeather({});
        try {
          setIsLoading(true);
          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData.daily);
          localStorage.setItem("location", location);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchWeather();
    },
    [location]
  );

  useEffect(function () {
    setLocation(localStorage.getItem("location") || "");
  }, []);

  return (
    <div className="app">
      <h1>Funcational Weather</h1>
      <Input location={location} onChangeLocation={setLocation} />
      {isLoading && <p className="loader">Loading...</p>}
      {weather.weathercode && (
        <Weather
          weather={weather}
          location={location}
          displayLocation={displayLocation}
        />
      )}
    </div>
  );
}
