import express from "express";
import { deleteUser, getAdminDashboardStats, getAllUsers, getPartnersWithVoucherStats, updateUser } from "../controllers/adminController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getAdminDashboardStats);
router.get("/users", protect, isAdmin, getAllUsers); // Fetch all users
router.put("/user/:id", protect, isAdmin, updateUser); // Update user by ID
router.delete("/user/:id", protect, isAdmin, deleteUser); 
router.get("/partners", protect, isAdmin, getPartnersWithVoucherStats); 

export default router;
