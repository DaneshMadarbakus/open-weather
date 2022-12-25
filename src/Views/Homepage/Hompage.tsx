import React from "react";

// type props = {
//   message?: string;
// };

export const Homepage = (): JSX.Element => {
  const callAPI = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=51.5072&lon=0.1276&appid=${process.env.WEATHER_API_KEY}`
    );

    console.log("Danesh response", response);
  };

  return (
    <>
      <h1>Open Weather Map</h1>

      <button
        onClick={() => {
          callAPI();
        }}
      >
        Call api
      </button>
    </>
  );
};
