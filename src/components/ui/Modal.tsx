import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ModalProps {
  onConfirm: () => void;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export const Modal: React.FC<ModalProps> = ({
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <Box
      position="fixed"
      top="20vh"
      left="35%"
      w="30%"
      p={10}
      bgColor="white"
      zIndex={100}
      borderRadius={10}
    >
      <Text textAlign="center" mb={4} fontWeight={500}>
        {message}
      </Text>
      <Flex justifyContent="center">
        <Button
          colorScheme="blue"
          onClick={() => {
            onConfirm();
          }}
          mr={4}
        >
          Confirm
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            onCancel(false);
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};
