import React from "react";
import { Homepage } from "../Homepage/Hompage";

export const AppWrapper = (): JSX.Element => {
  return (
    <>
      <header>
        <ul>
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </header>
      <main>
        <Homepage />
      </main>
    </>
  );
};
