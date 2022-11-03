import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import React from "react";
import { InputField } from "../components/custom_components/InputField";
import { SelectField } from "../components/custom_components/SelectField";
import { TextAreaField } from "../components/custom_components/TextAreaField";
import { productSchema } from "../yup_schema/product_validation";

import { useToast } from "@chakra-ui/react";

import { UploadFile } from "../components/custom_components/UploadFile";
import {
  spellCheckBox,
  trapCheckBox,
  monsterCheckBox,
  cardsCheckBox,
  accessoryCheckBox,
} from "../data/subCategory";

import { useNavigate } from "react-router-dom";
import { useAxiosAuth } from "../utils/axiosAuth";

interface FormValues {
  name: string;
  price: string;
  description: string;
  category: string;
  discount: string;
  subCategory: string[];
  mainImg: File[] | null;
  images: File[] | null;
  quantity: string;
}

export const NewProduct: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth(false);

  const initialValues: FormValues = {
    name: "",
    price: "",
    description: "",
    category: "",
    discount: "0",
    mainImg: null,
    images: null,
    subCategory: [],
    quantity: "",
  };

  return (
    <>
      <Box>
        <Flex>
          <Flex justify="center">
            <Box boxShadow="xl" p={10} mx="auto" w={[200, 400, 700, 1000]}>
              <Formik
                initialValues={initialValues}
                validationSchema={productSchema}
                onSubmit={async (values) => {
                  const formData = new FormData();

                  formData.append("name", values.name);
                  formData.append("price", values.price);
                  formData.append("description", values.description);
                  formData.append("category", values.category);
                  formData.append("discount", values.discount);
                  formData.append(
                    "subCategory",
                    JSON.stringify(values.subCategory)
                  );

                  formData.append("quantity", values.quantity);
                  formData.append("mainImg", values.mainImg![0]);
                  for (let file of values.images!) {
                    formData.append("images", file);
                  }

                  try {
                    const response = await axiosAuth.post(
                      `/products/new-product`,
                      formData
                    );

                    if (response.status === 201) {
                      toast({
                        description: "Add product successfully!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });
                      navigate(0);
                    }
                  } catch (err) {
                    toast({
                      description: "Failed to add product!",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                      position: "top",
                    });
                  }
                }}
              >
                {(props) => (
                  <Form encType="multipart/form-data">
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

                    <Text mt={5}>Cover image:</Text>
                    <UploadFile
                      setField={props.setFieldValue}
                      maxFiles={1}
                      fieldName="mainImg"
                    ></UploadFile>

                    <Text>Images:</Text>

                    <UploadFile
                      setField={props.setFieldValue}
                      maxFiles={4}
                      fieldName="images"
                    ></UploadFile>

                    <TextAreaField
                      name="description"
                      type="text"
                      label="Description:"
                      placeholder="Type product description"
                    ></TextAreaField>

                    <SelectField
                      name="category"
                      label="Category:"
                      handleChange={props.handleChange}
                      setField={props.setFieldValue}
                      value={props.values}
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
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
