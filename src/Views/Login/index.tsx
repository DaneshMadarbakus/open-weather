import React, { useState } from "react";
import { InputText } from "../../Components/InputText";

type FormData = {
  username?: string;
  password?: string;
};

export const Login = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({});

  const handleUpdateForm = (name: string, value: string): void => {
    setFormData({ ...formData, [name]: value });
  };

  const LoginUser = async (): Promise<void> => {
    const response = await fetch("http://localhost:8001/login", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    });

    console.log("Danesh response token: ", response);
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
