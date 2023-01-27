import React from "react";
import { Homepage } from "../Homepage";
import { Register } from "../Register";
import { Login } from "../Login";
import { UsersPage } from "../UsersPage";
import { Link, Route, Routes } from "react-router-dom";

export const AppWrapper = (): JSX.Element => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </>
  );
};
