import React, { useState } from "react";

export const Users = (): JSX.Element => {
  const [users, setUsers] = useState([]);
  // const registerUser = async (): Promise<void> => {
  //   const response = await fetch("http://localhost:8001/register", {
  //     headers: { "Content-type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   });

  //   const responseJSON = await response.json();
  //   console.log("Danesh response token: ", responseJSON);
  // };

  const requestUsers = async (): Promise<void> => {};

  return (
    <>
      <h1>USERS</h1>
      <button
        onClick={() => {
          requestUsers();
        }}
      >
        See all users
      </button>
    </>
  );
};
