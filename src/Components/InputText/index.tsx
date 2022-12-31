import React, { useState } from "react";
import "./index.css";

type ComponentProps = {
  label: string;
  name: string;
  changeHandler: Function;
};

export const InputText = ({ label, name, changeHandler }: ComponentProps) => {
  return (
    <div className="input-text">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        onChange={(e) => {
          changeHandler(name, e.target.value);
        }}
      />
    </div>
  );
};
