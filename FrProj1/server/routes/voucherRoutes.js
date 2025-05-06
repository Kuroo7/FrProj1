import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createVouchers,
  getPartnerVouchers,
  searchVoucherByCode,
  applyVoucher,
} from "../controllers/voucherController.js";

const router = express.Router();

// Admin routes
router.post("/create", protect, isAdmin, createVouchers);
router.get("/partner/:partnerId", protect, isAdmin, getPartnerVouchers);

// User routes
router.post("/search", searchVoucherByCode);
router.post("/apply", protect, applyVoucher);

export default router;
