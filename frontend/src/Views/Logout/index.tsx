import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/useUserContext";

type LogoutResponseJSON = {
  status: number;
};

export const Logout = (): JSX.Element => {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const LogoutUser = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8001/logout", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
      });

      const responseJSON: LogoutResponseJSON = await response.json();

      setUsername(null);

      localStorage.removeItem("authorization-token");
      localStorage.removeItem("refresh-token");

      console.log(responseJSON);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Logout</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          LogoutUser();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </>
  );
};
