import React, { useState } from "react";
import "./index.css";

type ComponentProps = {
  label: string;
  name: string;
  changeHandler: Function;
  password?: boolean;
};

export const InputText = ({
  label,
  name,
  changeHandler,
  password = false,
}: ComponentProps) => {
  return (
    <div className="input-text">
      <label htmlFor={name}>{label}</label>
      <input
        type={password ? "password" : "text"}
        name={name}
        onChange={(e) => {
          changeHandler(name, e.target.value);
        }}
      />
    </div>
  );
};
