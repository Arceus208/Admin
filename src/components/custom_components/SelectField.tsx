import { Box, Select, Text } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  category: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  category,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Box my={5}>
      <Text fontWeight={400}>{label}</Text>
      <Select isInvalid={!!meta.error} {...props} {...field}>
        {category.map((item, index) => (
          <option key={index + Math.random()}>{item}</option>
        ))}
      </Select>
      {meta.error && meta.touched && (
        <p style={{ color: "red" }}>{meta.error}</p>
      )}
    </Box>
  );
};
