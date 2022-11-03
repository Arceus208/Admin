import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { NewProduct } from "./pages/NewProduct";
import { AllProducts } from "./pages/AllProducts";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Customer } from "./pages/Customer";
import { Dashboard } from "./pages/Dashboard";

import Layout from "./pages/Layout";

import { AllOrders } from "./pages/AllOrders";
import { EditProduct } from "./pages/EditProduct";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Products } from "./pages/Products";
import { Calendar } from "./pages/Calendar";
import { Order } from "./pages/Order";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Login></Login>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard></Dashboard>
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/orders" element={<Orders></Orders>}>
            <Route path=":orderId" element={<Order></Order>}></Route>
            <Route index element={<AllOrders></AllOrders>}></Route>
            <Route path="all" element={<AllOrders></AllOrders>}></Route>
          </Route>

          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <Customer></Customer>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar></Calendar>
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/products" element={<Products></Products>}>
            <Route path="all" element={<AllProducts></AllProducts>}></Route>
            <Route path="new" element={<NewProduct></NewProduct>}></Route>
            <Route
              path="edit/:productId"
              element={<EditProduct></EditProduct>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
