export const mockFetch = (url: string) => {
  if (
    url.startsWith("http://api.openweathermap.org/geo/1.0/direct") &&
    url.includes("London")
  ) {
    return {
      ok: true,
      status: 200,
      json: async () => {
        return [{ lat: 123, lon: 123, name: "London", country: "GB" }];
      },
    };
  } else if (
    url.startsWith("https://api.openweathermap.org/data/2.5/weather")
  ) {
    return {
      ok: true,
      status: 200,
      json: async () => {
        return {
          sys: { sunrise: 1234, sunset: 1234 },
          weather: [{ description: "a description" }],
          main: { temp: 4321 },
        };
      },
    };
  }

  throw new Error(`Unhandled request: ${url}`);
};
