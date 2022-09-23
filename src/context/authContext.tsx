import { createContext, ReactNode, useContext, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

interface AuthContextProps {
  token: string;
  isLogin: boolean;
  login: (token: string) => void;
  logout: () => void;
  isTokenExpires: () => boolean;
  setTokenValue: (token: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string>("");

  const isLogin = !!token;

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  const setTokenValue = (token: string) => {
    setToken(token);
  };

  const isTokenExpires = () => {
    if (!token) {
      return true;
    }

    const { exp } = jwt_decode<JwtPayload>(token);
    const timeLeft = new Date().getTime() - exp! * 1000;
    return timeLeft > 0 ? true : false;
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isLogin, isTokenExpires, setTokenValue }}
    >
      {children}
    </AuthContext.Provider>
  );
};
