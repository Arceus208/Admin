import { Button } from "@chakra-ui/react";
import { Formik, FormikProps, Form } from "formik";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/custom_components/InputField";
import { useAuthContext } from "../context/authContext";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.FC<LoginProps> = () => {
  const [socket, setSocket] = useState<Socket>();

  const { setTokenValue } = useAuthContext();
  const navigate = useNavigate();
  const initialValues: FormValues = { email: "", password: "" };

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_HOST}`);

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/users/login`,
            {
              method: "POST",
              credentials: "include",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(values),
            }
          );

          const data = await response.json();

          if (response.status === 201) {
            setTokenValue(data.accessToken);
            navigate("/dashboard");

            if (socket) {
              socket.emit("login", { role: "admin", userId: data.user });
            }
          } else {
            console.log(data.message);
          }
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <InputField
              name="email"
              type="text"
              label="Email:"
              placeholder="Type your email"
            ></InputField>
            <InputField
              name="password"
              type="password"
              label="Password:"
              placeholder="Type your password"
            ></InputField>
            <Button
              textColor={"white"}
              w={[100, 300, 300]}
              mt={5}
              bgGradient="linear(to-r, green.200, pink.500)"
              borderRadius={20}
              isLoading={props.isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
