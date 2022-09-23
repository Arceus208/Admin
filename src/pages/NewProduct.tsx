import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import React from "react";
import { InputField } from "../components/custom_components/InputField";
import { SelectField } from "../components/custom_components/SelectField";
import { TextAreaField } from "../components/custom_components/TextAreaField";
import { productSchema } from "../yup_schema/product_validation";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Wrapper from "../components/ui/Wrapper";
import { UploadFile } from "../components/custom_components/UploadFile";
import {
  spellCheckBox,
  trapCheckBox,
  monsterCheckBox,
  boxCheckBox,
  accessoryCheckBox,
} from "../data/subCategory";

import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  price: string;
  description: string;
  category: string;
  cardSubCategory: string[];
  boxSubCategory: string[];
  accessorySubCategory: string[];
  mainImg: File[] | null;
  images: File[] | null;
  quantity: string;
}

export const NewProduct: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: "",
    price: "",
    description: "",
    category: "",
    mainImg: null,
    images: null,
    cardSubCategory: [],
    boxSubCategory: [],
    accessorySubCategory: [],
    quantity: "",
  };

  return (
    <>
      <Box>
        <Wrapper>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={productSchema}
              onSubmit={async (values) => {
                const formData = new FormData();

                formData.append("name", values.name);
                formData.append("price", values.price);
                formData.append("description", values.description);
                formData.append("category", values.category);
                if (values.category === "cards") {
                  formData.append(
                    "subCategory",
                    JSON.stringify(values.cardSubCategory)
                  );
                } else if (values.category === "box") {
                  formData.append(
                    "subCategory",
                    JSON.stringify(values.boxSubCategory)
                  );
                } else {
                  formData.append(
                    "subCategory",
                    JSON.stringify(values.accessorySubCategory)
                  );
                }

                formData.append("quantity", values.quantity);
                formData.append("mainImg", values.mainImg![0]);
                for (let file of values.images!) {
                  formData.append("images", file);
                }

                try {
                  console.log(values);
                  const response = await axios.post(
                    `http://localhost:4000/products/new-product`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );

                  console.log(response.data);

                  /* navigate(0); */

                  toast({
                    description: "Add product successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
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
                  <InputField
                    name="price"
                    type="number"
                    label="Price:"
                    placeholder="Type price"
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
                    label="Description"
                    placeholder="Type product description"
                  ></TextAreaField>
                  <SelectField
                    name="category"
                    label="Category:"
                    placeholder="Choose a category"
                    category={["cards", "box", "accessory"]}
                  ></SelectField>
                  {props.values.category === "cards" && (
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
                              name="cardSubCategory"
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
                              name="cardSubCategory"
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
                              name="cardSubCategory"
                              value={item.value}
                            />
                            {item.label}
                          </Box>
                        ))}
                      </Flex>
                    </Flex>
                  )}
                  {props.values.category === "box" && (
                    <Flex
                      my={5}
                      flexDirection={["column", "column", "row", "row"]}
                      justifyContent="space-around"
                    >
                      <Flex flexDirection="column">
                        {boxCheckBox.map((item) => (
                          <Box key={Math.random()}>
                            <Field
                              type="checkbox"
                              name="boxSubCategory"
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
                              name="accessorySubCategory"
                              value={item.value}
                            />
                            {item.label}
                          </Box>
                        ))}
                      </Flex>
                    </Flex>
                  )}

                  <InputField
                    name="quantity"
                    type="number"
                    label="Quantity"
                    placeholder="quantity"
                  ></InputField>
                  <Button
                    textColor={"white"}
                    w={[100, 300, 300]}
                    mt={5}
                    bgGradient="linear(to-r, green.200, pink.500)"
                    borderRadius={20}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};
