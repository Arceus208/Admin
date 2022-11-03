import React, { useEffect, useState } from "react";
import { useReFreshToken } from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const PersistLogin: React.FC<{}> = () => {
  const refresh = useReFreshToken();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    verifyRefreshToken();
  }, [refresh]);

  return <Box>{isLoading ? <Box>loading...</Box> : <Outlet></Outlet>}</Box>;
};

export default PersistLogin;
