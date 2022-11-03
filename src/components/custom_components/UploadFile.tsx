import { Box, Flex, Text, Image, Icon } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface UploadFileProps {
  setField: any;
  maxFiles?: number;
  fieldName: string;
}

export const UploadFile: React.FC<UploadFileProps> = ({
  setField,
  maxFiles,
  fieldName,
}) => {
  const [files, setFiles] = useState<any>([]);

  const removeImg = (id: string) => {
    setFiles((prev: any) => {
      return prev.filter((file: any) => file.imgId !== id);
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (maxFiles !== 1) {
        setFiles((prev: any) => {
          const newFiles = acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              imgId: uuidv4(),
            })
          );
          return [...prev, ...newFiles];
        });
      } else {
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              imgId: uuidv4(),
            })
          )
        );
      }
    },
    [maxFiles]
  );

  useEffect(() => {
    setField(fieldName, files);
  }, [files, setField, fieldName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
  });

  return (
    <Box mt={10}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Flex h={150} borderRadius="20px" align="center" justify="center">
            <Text>Drop file here</Text>
          </Flex>
        ) : (
          <Flex
            h={150}
            borderRadius="20px"
            align="center"
            justify="center"
            boxShadow="md"
          >
            <Text>Drag 'n' drop some files here, or click to select files</Text>
          </Flex>
        )}
      </div>
      <Flex mt={5} flexWrap="wrap">
        {files.length !== 0 &&
          files.map((file: any) => (
            <Box
              mx={3}
              my={3}
              p="5px"
              key={file.imgId}
              position="relative"
              borderRadius={10}
              boxShadow="md"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                _hover={{ cursor: "pointer" }}
                onClick={removeImg.bind(null, file.imgId)}
              >
                <Icon as={AiOutlineCloseCircle}></Icon>
              </Box>
              <Image src={file.preview} h={200} w={200} fit="contain"></Image>
            </Box>
          ))}
      </Flex>
    </Box>
  );
};
