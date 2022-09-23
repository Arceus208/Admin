import React from "react";
import { Link } from "react-router-dom";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Link to="/new_product">Add new product</Link>
      <Link to="/all_products">All products</Link>
    </>
  );
};
