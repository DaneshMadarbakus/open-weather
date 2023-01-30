//NEED TO COMPLETELY REWRITE THIS - NOT HAPPY

import { useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { UserContext } from "../Contexts/useUserContext";

type UseAuthTokenReturn = {
  isAuthorized: boolean;
  token: string | null;
};

export function useAuthToken(): UseAuthTokenReturn {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authorization-token")
  );
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const { username } = useContext(UserContext);
  const refreshToken = localStorage.getItem("refresh-token");

  const jwt = token ? useJwt(token) : null;

  console.log("Danesh useAuthToken 1", jwt);

  useEffect(() => {
    console.log("Danesh useEffect 0");
    async function fetchRefreshedAccessToken(rToken: string) {
      try {
        const response = await fetch("http://localhost:8001/refresh-token", {
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username: username, token: rToken }),
          method: "POST",
        });

        const { accessToken } = await response.json();

        // localStorage.setItem("authorization-token", accessToken);
        setToken(accessToken);
        setIsAuthorized(true);
        console.log("Danesh useEffect final");
      } catch (err) {
        console.log("fetchRefreshedAccessToken error: ", err);
      }
    }

    if (jwt && jwt.decodedToken && !jwt.isExpired) {
      console.log("Danesh useEffect 1");
      // setToken(token);
      setIsAuthorized(true);
    } else if (!refreshToken) {
      console.log("Danesh useEffect 2");
      setIsAuthorized(false);
    } else {
      console.log("Danesh useEffect 3");
      fetchRefreshedAccessToken(refreshToken);
    }
  }, []);

  console.log("useAuthToken 2");

  return { isAuthorized, token };
}
