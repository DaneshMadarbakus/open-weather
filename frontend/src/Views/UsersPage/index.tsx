import React, { useState } from "react";
import { useAuthToken } from "../../Hooks/useAuthToken";

type UsersResponseJSON = {
  status: number;
  results: UserResults;
};

type UserResults = { username: string }[];

export const UsersPage = (): JSX.Element => {
  const [users, setUsers] = useState<UserResults>([]);
  const { isAuthorized, token } = useAuthToken();

  const requestUsers = async (): Promise<void> => {
    try {
      if (isAuthorized && token) {
        const response = await fetch("http://localhost:8001/users", {
          headers: { "Content-type": "application/json", authorization: token },
        });
        const responseJSON: UsersResponseJSON = await response.json();

        setUsers(responseJSON.results);
      }
    } catch (err) {
      console.log("UsersPage Error: ", err);
    }
  };

  return (
    <>
      <h1>Users</h1>
      <button
        onClick={() => {
          requestUsers();
        }}
      >
        See all users
      </button>
      {users.length > 0 && (
        <ul>
          {users.map((user) => {
            return <li key={user.username}>{user.username}</li>;
          })}
        </ul>
      )}
    </>
  );
};
