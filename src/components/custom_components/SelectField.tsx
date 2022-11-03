import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  category: string[];
  setField: any;
  handleChange: any;
  value: any;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  category,
  setField,
  handleChange,
  value,
  ...props
}) => {
  return (
    <Box my={5}>
      <>
        <Text fontWeight={400} my={2}>
          {label}
        </Text>
        <Select
          value={value.category}
          {...props}
          onChange={(e) => {
            handleChange(e);
            setField("subCategory", []);
          }}
        >
          {category.map((item, index) => (
            <option key={index + Math.random()} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </>
    </Box>
  );
};
