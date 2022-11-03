import * as yup from "yup";
export const productSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Product name must be greater than 0")
    .required("Required"),
  price: yup
    .number()
    .positive("Price must be greater than 0")
    .required("Required"),
  description: yup.string(),
  category: yup
    .string()
    .oneOf(["card", "cards", "accessory"])
    .required("Required"),
  quantity: yup
    .number()
    .positive("Quantity must be greater than 0")
    .required("Required"),
  discount: yup
    .number()
    .min(0, "Discount cannot be smaller than 0")
    .max(99, "Discount cannot be greater than 99")
    .required("Required"),
});
