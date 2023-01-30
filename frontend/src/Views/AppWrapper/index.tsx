import React from "react";
import { UserContextProvider } from "../../Contexts/useUserContext";
import { Homepage } from "../Homepage";
import { Register } from "../Register";
import { Login } from "../Login";
import { UsersPage } from "../UsersPage";
import { Header } from "../../Components/Header";
import { Route, Routes } from "react-router-dom";
import { Logout } from "../Logout";

export const AppWrapper = (): JSX.Element => {
  return (
    <UserContextProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </UserContextProvider>
  );
};
