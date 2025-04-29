import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // your frontend url
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vouchers", voucherRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
