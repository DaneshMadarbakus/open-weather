import React, { useState, useContext } from "react";
import { InputText } from "../../Components/InputText";
import { UserContext } from "../../Contexts/useUserContext";

import "./index.css";

type FormData = {
  username?: string;
  email?: string;
  password?: string;
};

type RegisterResponseJSON = {
  status: number;
  messsage: string;
  user: { username: string };
  accessToken: string;
  refreshToken: string;
};

export const Register = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({});
  const { setUsername } = useContext(UserContext);

  const handleUpdateForm = (name: string, value: string): void => {
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (): Promise<void> => {
    const response = await fetch("http://localhost:8001/register", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    });

    const responseJSON: RegisterResponseJSON = await response.json();

    setUsername(responseJSON.user.username);

    localStorage.setItem("authorization-token", responseJSON.accessToken);
    localStorage.setItem("refresh-token", responseJSON.refreshToken);
  };

  return (
    <>
      <h1>Register</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          registerUser();
        }}
      >
        <InputText
          label="Username:"
          name="username"
          changeHandler={handleUpdateForm}
        />
        <InputText
          label="Email:"
          name="email"
          changeHandler={handleUpdateForm}
        />
        <InputText
          label="Password:"
          name="password"
          password={true}
          changeHandler={handleUpdateForm}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
