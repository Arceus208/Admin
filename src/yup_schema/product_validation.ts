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
  category: yup.string().oneOf(["cards", "accessory", "box"]),
  quantity: yup
    .number()
    .positive("Quantity must be greater than 0")
    .required("Required"),
});
