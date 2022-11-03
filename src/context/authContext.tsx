import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
  token: string;
  isLogin: boolean;
  login: (token: string) => void;
  logout: () => void;

  setToken: (token: string) => void;
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

  return (
    <AuthContext.Provider value={{ token, login, logout, isLogin, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
