import React from "react";
import { WeatherApp } from "../../Components/WeatherApp/WeatherApp";

export const Homepage = (): JSX.Element => {
  return (
    <>
      <h1>Open Weather Map</h1>
      <WeatherApp />
    </>
  );
};
