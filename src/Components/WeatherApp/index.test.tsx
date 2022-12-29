import React from "react";
import { WeatherApp } from ".";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockFetch } from "./mocks";

globalThis.fetch = jest.fn().mockImplementation(mockFetch);

describe("WeatherApp Component", () => {
  it("renders", () => {
    render(<WeatherApp />);
    screen.getByText("Please enter a location");
  });

  it("Shows data after recieving response from weather api", async () => {
    render(<WeatherApp />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "London" } });

    expect(input.value).toBe("London");

    await act(async () => {
      fireEvent.click(button);
    });

    screen.getByText("a description");
    screen.getByText("4321");
  });

  it("Shows data after recieving response from weather api", async () => {
    render(<WeatherApp />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "badlocation" } });

    expect(input.value).toBe("badlocation");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.queryByText("Weather:")).toBe(null);
  });
});
