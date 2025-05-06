import express from "express";
import { registerUser, loginUser, logoutUser,getProfile, loginWithPhone } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/login-phone", loginWithPhone);
router.get("/profile",protect, getProfile);


export default router;
