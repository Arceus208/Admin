import { Text, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const TextAreaField: React.FC<TextAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Text fontWeight={400}>{label}</Text>
      <Textarea
        isInvalid={!!meta.error}
        {...props}
        {...field}
        _placeholder={{ opacity: 0.6 }}
      ></Textarea>
      {meta.error && meta.touched && (
        <p style={{ color: "red" }}>{meta.error}</p>
      )}
    </>
  );
};
