import { useCallback } from "react";

import { useAuthContext } from "../context/authContext";

export const useReFreshToken = () => {
  const { setToken } = useAuthContext();

  const refresh = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/refresh_token`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();

    setToken(data.accessToken);
  }, [setToken]);

  return refresh;
};
