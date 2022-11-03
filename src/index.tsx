import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ChakraProvider>
        <Routes>
          <Route path="/*" element={<App></App>}></Route>
        </Routes>
      </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>
);
