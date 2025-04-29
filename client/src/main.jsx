import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
