import React, { useContext } from "react";
import { UserContext } from "../../Contexts/useUserContext";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
  const { username } = useContext(UserContext);

  return (
    <header>
      <span>{username ? `Hi ${username}` : "Please login"}</span>
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
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
