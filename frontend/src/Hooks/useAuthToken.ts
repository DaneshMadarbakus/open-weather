import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

type UseAuthTokenReturn = {
  isAuthorized: boolean;
  token: string | null;
};

export function useAuthToken(): UseAuthTokenReturn {
  console.log("Danesh hook 0");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authorization-token")
  );
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const jwt = token ? useJwt(token) : null;

  console.log("Danesh hook 1");

  useEffect(() => {
    console.log("Danesh hook useEffect 0 ");
    async function fetchRefreshedAccessToken(rToken: string) {
      console.log("Danesh hook useEffect 6 ");
      try {
        const response = await fetch("http://localhost:8001/refresh-token", {
          headers: {
            "Content-type": "application/json",
            // username: username,
            token: rToken,
          },
          method: "POST",
        });
        console.log("HEREEE1: ", response);
        const responseJSON: { accessToken: string } = await response.json();
        console.log("HEREEE2: ", responseJSON);
        setToken(responseJSON.accessToken);
      } catch (err) {
        console.log("fetchRefreshedAccessToken error: ", err);
      }
    }
    console.log("Danesh hook useEffect 1 ");
    if (token && jwt && !jwt.isExpired) {
      setIsAuthorized(true);
    }
    console.log("Danesh hook useEffect 2 ");
    const refreshToken = localStorage.getItem("refresh-token");
    console.log("Danesh hook useEffect 3 ");
    if (!refreshToken) {
      console.log("Danesh hook useEffect 4 ");
      setIsAuthorized(false);
    } else {
      console.log("Danesh hook useEffect 5 ");
      fetchRefreshedAccessToken(refreshToken);
    }
  }, []);

  console.log("Danesh hook 2");

  return { isAuthorized, token };
}
