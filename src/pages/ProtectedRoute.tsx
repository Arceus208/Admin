import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useUser } from "../hooks/useUser";
import { NavLink as ReactLink } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loggedIn } = useUser();

  return (
    <>
      {!loggedIn && (
        <Box>
          <Text>Please login</Text>
          <ReactLink to="login">To login page</ReactLink>
        </Box>
      )}
      {loggedIn && <Box>{children}</Box>}
    </>
  );
};
