import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  newUserLogin: () => void;
}

interface ClientToServerEvents {
  login: (data: SocketData) => void;
}

interface SocketData {
  userId: string;
  role: string;
}

interface UserProps {}

export const User: React.FC<UserProps> = ({}) => {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState<Socket>();

  const setClientSocket = () => {
    setSocket(io(`${process.env.REACT_APP_HOST}`));
  };

  const login = () => {
    if (socket) {
      socket.emit("login", { role: "admin", userId: "1234" });
      console.log(socket);
    }
  };

  useEffect(() => {
    if (socket) {
      socket!.on("newUserLogin", (data) => {
        setUsers(data);
        console.log(data);
      });
    }
  }, [socket]);

  return (
    <Box>
      <Button onClick={setClientSocket}>setsocket</Button>
      <Button onClick={login}>Login</Button>
      {users && (
        <Box>
          {users.map((user: any, index) => (
            <Box key={index}>{user.userId}</Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
