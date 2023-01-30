import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { decodeToken } from "react-jwt";
import { jwtTokenDecoded } from "../global.types";

type UserContextType = {
  username: string | null;
  setUsername:
    | Dispatch<SetStateAction<string | null>>
    | ((arg0: string | null) => void);
};

type Props = {
  children: ReactNode | ReactNode[];
};

export const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => {},
});

export const UserContextProvider = ({ children }: Props): JSX.Element => {
  const [username, setUsername] = useState<string | null>(null);
  const token: string | null = localStorage.getItem("authorization-token");

  let defaultUsername = null;
  let jwt: jwtTokenDecoded | null = null;

  if (token) {
    jwt = decodeToken(token);
  }

  if (jwt) {
    defaultUsername = jwt.username;
  }

  return (
    <UserContext.Provider
      value={{
        username: username || defaultUsername,
        setUsername: (usernameString: string | null) =>
          setUsername(usernameString),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
