import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik, FormikProps, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/custom_components/InputField";
import { useAuthContext } from "../context/authContext";

import { useNavigate } from "react-router-dom";
import Wrapper from "../components/ui/Wrapper";

interface LoginProps {}

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.FC<LoginProps> = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const initialValues: FormValues = { email: "", password: "" };

  return (
    <Box h="100vh">
      <Wrapper>
        <Box w={[200, 400, 500, 500]} mx="auto" boxShadow="xl" p={10} h={400}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              try {
                const response = await fetch(
                  `${process.env.REACT_APP_HOST}/users/login`,
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
                  setToken(data.accessToken);
                  setError("");
                  navigate("/dashboard");
                } else {
                  setError(data.message);
                }
              } catch (err) {
                console.log(err);
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
                {error && (
                  <Flex justify="center">
                    <Text my={2} color="red">
                      {error}
                    </Text>
                  </Flex>
                )}
                <Flex justifyContent="center">
                  <Button
                    textColor={"white"}
                    w={[100, 300, 300]}
                    mt={5}
                    colorScheme="blue"
                    borderRadius={20}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Login
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};
