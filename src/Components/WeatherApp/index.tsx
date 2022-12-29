import React, { useState } from "react";

type weatherData = {
  name: string;
  country: string;
  sunriseTime: string;
  sunsetTime: string;
  weatherDescription: string;
  temp: number;
};

const convertUnixToTime = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);

  const hours = date.getHours().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutes = date.getMinutes().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${hours}:${minutes}`;
};

export const WeatherApp = (): JSX.Element => {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);

  const callWeatherAPI = async (setLocation: string) => {
    try {
      const locationResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${setLocation}&appid=${process.env.WEATHER_API_KEY}`
      );

      const { lat, lon, name, country } = (await locationResponse.json())[0];

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`
      );

      const {
        sys: { sunrise, sunset },
        weather: [{ description }],
        main: { temp },
      } = await weatherResponse.json();

      const sunriseTime = convertUnixToTime(sunrise);
      const sunsetTime = convertUnixToTime(sunset);

      setWeatherData({
        name,
        country,
        sunriseTime,
        sunsetTime,
        weatherDescription: description,
        temp,
      });
    } catch (err) {
      err;
    }
  };

  return (
    <div>
      <label htmlFor="location">Please enter a location</label>
      <input
        name="location"
        type="text"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />

      <button
        onClick={() => {
          callWeatherAPI(location);
        }}
      >
        Check Weather
      </button>

      {weatherData ? (
        <div>
          <h2>
            The weather in {weatherData.name}, {weatherData.country}
          </h2>
          <ul>
            <li>
              <b>Weather:</b> {weatherData.weatherDescription}
            </li>
            <li>
              <b>Sunrise time:</b> {weatherData.sunriseTime}
            </li>
            <li>
              <b>Sunset time:</b> {weatherData.sunsetTime}
            </li>
            <li>
              <b>Temperature:</b> {weatherData.temp}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};
