import { Input, Text } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Text fontWeight="bold" my={3}>
        {label}
      </Text>
      <Input
        isInvalid={!!meta.error}
        {...props}
        {...field}
        _placeholder={{ opacity: 0.6 }}
      ></Input>
      {meta.error && meta.touched && (
        <p style={{ color: "red" }}>{meta.error}</p>
      )}
    </>
  );
};
