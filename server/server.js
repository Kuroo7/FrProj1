import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from './routes/adminRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/partner', partnerRoutes);



// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
