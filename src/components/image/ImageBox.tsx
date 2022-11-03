import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BackDrop } from "../ui/BackDrop";
import { Modal } from "../ui/Modal";

import { useNavigate } from "react-router-dom";
import { useAxiosAuth } from "../../utils/axiosAuth";

interface ImageBoxProps {
  imgSrc: string;
  photoId?: string;
  productId?: string;
  isDeleteAble?: boolean;
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  imgSrc,
  photoId,
  productId,
  isDeleteAble,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const axiosAuthWithOutFile = useAxiosAuth(false);

  const deleteImage = async () => {
    try {
      await axiosAuthWithOutFile.delete(
        `/products/${productId}?photoId=${photoId}`
      );

      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <BackDrop></BackDrop>
          <Modal
            message="Do you want to delete image?"
            onCancel={setIsModalOpen}
            onConfirm={() => {
              deleteImage();
              setIsModalOpen(false);
            }}
          ></Modal>
        </>
      )}
      <Flex
        mx={3}
        my={3}
        p="auto"
        h={250}
        w={250}
        position="relative"
        borderRadius={10}
        boxShadow="md"
        justifyContent="center"
        align="center"
      >
        {isDeleteAble && (
          <Box
            position="absolute"
            top={0}
            right={0}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Icon boxSize={6} as={BiEdit}></Icon>
          </Box>
        )}

        <Image src={imgSrc} h={200} w={200} fit="contain"></Image>
      </Flex>
    </>
  );
};
