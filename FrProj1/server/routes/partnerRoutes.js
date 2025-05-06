import express from "express";
import { getPartnerVouchersDetailed } from "../controllers/partnerController.js";
import { isNotUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/partners/:partnerId/vouchers",protect,isNotUser, getPartnerVouchersDetailed);

export default router;
