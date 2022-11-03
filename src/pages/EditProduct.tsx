import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { useToast, Text } from "@chakra-ui/react";
import { InputField } from "../components/custom_components/InputField";
import { TextAreaField } from "../components/custom_components/TextAreaField";
import { SelectField } from "../components/custom_components/SelectField";
import {
  accessoryCheckBox,
  cardsCheckBox,
  monsterCheckBox,
  spellCheckBox,
  trapCheckBox,
} from "../data/subCategory";
import { productSchema } from "../yup_schema/product_validation";

import { ImageBox } from "../components/image/ImageBox";
import { UploadFile } from "../components/custom_components/UploadFile";
import { useNavigate } from "react-router-dom";
import { useAxiosAuth } from "../utils/axiosAuth";
import { axiosPublic } from "../utils/axiosPublic";
import useSWR, { Fetcher } from "swr";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  subCategory: string[];
  discount: number;
  images: { path: string; photoId: string }[];
  mainImg: { path: string; photoId: string };
}

export const EditProduct: React.FC<{}> = () => {
  const toast = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const axiosAuthWithData = useAxiosAuth(true);
  const axiosAuthWithOutData = useAxiosAuth(false);

  const fetcher: Fetcher<Product, string> = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.product);

  const { data, error } = useSWR(`/products/product/${productId}`, fetcher);

  return (
    <Box>
      <Flex>
        {error && <Box>There is no such product</Box>}
        {data && !error && (
          <Flex justify="center">
            <Box boxShadow="xl" p={10} w={[200, 400, 700, 800]}>
              <Formik
                initialValues={{
                  name: data.name,
                  price: data.price,
                  description: data.description,
                  quantity: data.quantity,
                  category: data.category,
                  discount: data.discount,

                  subCategory: data.subCategory,
                }}
                validationSchema={productSchema}
                onSubmit={async (values) => {
                  try {
                    const response = await axiosAuthWithOutData.patch(
                      `/products/editProduct/${productId}`,
                      {
                        name: values.name,
                        price: values.price,
                        description: values.description,
                        quantity: values.quantity,
                        category: values.category,
                        subCategory: JSON.stringify(values.subCategory),
                        discount: values.discount,
                      }
                    );

                    if (response.status === 201) {
                      toast({
                        description: "Edit product successfully!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });

                      navigate(0);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <InputField
                      name="name"
                      type="text"
                      label="Name of product:"
                      placeholder="Type product name"
                    ></InputField>
                    <Flex mt={5}>
                      <Box mr={[3, 10, 20, 20]}>
                        <InputField
                          name="price"
                          type="number"
                          label="Price:"
                          placeholder="Type price"
                        ></InputField>
                      </Box>
                      <Box>
                        <InputField
                          name="quantity"
                          type="number"
                          label="Quantity:"
                          placeholder="quantity"
                        ></InputField>
                      </Box>
                    </Flex>

                    <InputField
                      name="discount"
                      type="number"
                      label="Discount(in %):"
                      placeholder="Type discount"
                    ></InputField>

                    <TextAreaField
                      name="description"
                      type="text"
                      label="Description:"
                      placeholder="Type product description"
                    ></TextAreaField>
                    <SelectField
                      handleChange={props.handleChange}
                      setField={props.setFieldValue}
                      value={props.values}
                      name="category"
                      label="Category:"
                      placeholder="Choose a category"
                      category={["card", "cards", "accessory"]}
                    ></SelectField>

                    {props.values.category === "card" && (
                      <Flex
                        my={5}
                        flexDirection={["column", "column", "row", "row"]}
                        justifyContent="space-around"
                      >
                        <Flex flexDirection="column">
                          {spellCheckBox.map((item) => (
                            <Box key={Math.random()}>
                              <Field
                                type="checkbox"
                                name="subCategory"
                                value={item.value}
                              />
                              {item.label}
                            </Box>
                          ))}
                        </Flex>
                        <Flex flexDirection="column">
                          {trapCheckBox.map((item) => (
                            <Box key={Math.random()}>
                              <Field
                                type="checkbox"
                                name="subCategory"
                                value={item.value}
                              />
                              {item.label}
                            </Box>
                          ))}
                        </Flex>
                        <Flex flexDirection="column">
                          {monsterCheckBox.map((item) => (
                            <Box key={Math.random()}>
                              <Field
                                type="checkbox"
                                name="subCategory"
                                value={item.value}
                              />
                              {item.label}
                            </Box>
                          ))}
                        </Flex>
                      </Flex>
                    )}
                    {props.values.category === "cards" && (
                      <Flex
                        my={5}
                        flexDirection={["column", "column", "row", "row"]}
                        justifyContent="space-around"
                      >
                        <Flex flexDirection="column">
                          {cardsCheckBox.map((item) => (
                            <Box key={Math.random()}>
                              <Field
                                type="checkbox"
                                name="subCategory"
                                value={item.value}
                              />
                              {item.label}
                            </Box>
                          ))}
                        </Flex>
                      </Flex>
                    )}

                    {props.values.category === "accessory" && (
                      <Flex
                        my={5}
                        flexDirection={["column", "column", "row", "row"]}
                        justifyContent="space-around"
                      >
                        <Flex flexDirection="column">
                          {accessoryCheckBox.map((item) => (
                            <Box key={Math.random()}>
                              <Field
                                type="checkbox"
                                name="subCategory"
                                value={item.value}
                              />
                              {item.label}
                            </Box>
                          ))}
                        </Flex>
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
                        Submit
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>

              <Text fontWeight="bold">Cover Image:</Text>
              {!isChange ? (
                <Flex flexDirection="column" align="center">
                  <ImageBox imgSrc={data.mainImg.path}></ImageBox>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      setIsChange(true);
                    }}
                  >
                    Change cover image
                  </Button>
                </Flex>
              ) : (
                <Formik
                  initialValues={{ mainImg: null }}
                  onSubmit={async (values) => {
                    try {
                      const formData = new FormData();
                      formData.append("mainImg", values.mainImg![0]);
                      const response = await axiosAuthWithData.patch(
                        `/products/mainImg/${productId}`,
                        formData
                      );
                      if (response.status === 201) {
                        navigate(0);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  {(props) => (
                    <Form encType="multipart/form-data">
                      <UploadFile
                        setField={props.setFieldValue}
                        maxFiles={1}
                        fieldName="mainImg"
                      ></UploadFile>
                      <Flex justifyContent="center">
                        <Button type="submit" colorScheme="blue" mr={10}>
                          Submit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            setIsChange(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              )}

              <Text fontWeight="bold">Product images:</Text>
              {!isAdd ? (
                <Flex flexDirection="column" align="center">
                  <Flex flexWrap="wrap" justifyContent="center">
                    {data.images.map((img) => (
                      <ImageBox
                        productId={productId}
                        photoId={img.photoId}
                        imgSrc={img.path}
                        isDeleteAble={true}
                        key={img.photoId}
                      ></ImageBox>
                    ))}
                  </Flex>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      setIsAdd(true);
                    }}
                  >
                    Add image
                  </Button>
                </Flex>
              ) : (
                <Formik
                  initialValues={{ images: null }}
                  onSubmit={async (values) => {
                    try {
                      const formData = new FormData();
                      for (let file of values.images! as File[]) {
                        formData.append("images", file);
                      }

                      const response = await axiosAuthWithData.patch(
                        `/products/editPhotos/${productId}`,
                        formData
                      );
                      if (response.status === 201) {
                        navigate(0);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  {(props) => (
                    <Form encType="multipart/form-data">
                      <UploadFile
                        setField={props.setFieldValue}
                        fieldName="images"
                      ></UploadFile>
                      <Flex justifyContent="center">
                        <Button type="submit" colorScheme="blue" mr={10}>
                          Submit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            setIsAdd(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
