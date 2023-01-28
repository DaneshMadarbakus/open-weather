import React, { useState, useContext } from "react";
import { InputText } from "../../Components/InputText";
import { UserContext } from "../../Contexts/useUserContext";

type FormData = {
  username?: string;
  password?: string;
};

type LoginResponseJSON = {
  status: number;
  user: { username: string };
  accessToken: string;
  refreshToken: string;
};

export const Login = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({});
  const { setUsername } = useContext(UserContext);

  const handleUpdateForm = (name: string, value: string): void => {
    setFormData({ ...formData, [name]: value });
  };

  const LoginUser = async (): Promise<void> => {
    const response = await fetch("http://localhost:8001/login", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    });

    const responseJSON: LoginResponseJSON = await response.json();

    setUsername(responseJSON.user.username);

    localStorage.setItem("authorization-token", responseJSON.accessToken);
    localStorage.setItem("refresh-token", responseJSON.refreshToken);
  };

  return (
    <>
      <h1>Login</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          LoginUser();
        }}
      >
        <InputText
          label="Username:"
          name="username"
          changeHandler={handleUpdateForm}
        />
        <InputText
          label="Password:"
          name="password"
          password={true}
          changeHandler={handleUpdateForm}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
