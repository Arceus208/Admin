import React from "react";

import "./App.css";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { NewProduct } from "./pages/NewProduct";
import { AllProducts } from "./pages/AllProducts";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { User } from "./pages/User";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/new_product" element={<NewProduct></NewProduct>}></Route>
        <Route
          path="/all_products"
          element={<AllProducts></AllProducts>}
        ></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/user" element={<User></User>}></Route>
      </Routes>
    </Box>
  );
}

export default App;
