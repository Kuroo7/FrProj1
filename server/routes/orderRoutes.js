import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getUserOrders);

router.get('/:orderId', protect, getOrderById);

// Admin: Get all orders
router.get("/", protect, isAdmin, getAllOrders);

export default router;
