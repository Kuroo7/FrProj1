import Voucher from "../models/Voucher.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// @desc Admin: Create multiple vouchers for a partner
export const createVouchers = async (req, res) => {
  const { partnerId, numberOfVouchers, assignedProductIds,discountPercentage,maxUses,isGeneric } = req.body;

  const vouchers = [];

  for (let i = 0; i < numberOfVouchers; i++) {
    const code = generateUniqueCode(); // Helper function below

    vouchers.push({
      code,
      partner: partnerId,
      assignedProducts: assignedProductIds,
      discountPercentage,
      maxUses,
      isGeneric
    });
  }

  const createdVouchers = await Voucher.insertMany(vouchers);

  res.status(201).json(createdVouchers);
};

// @desc Helper function: Generate random voucher code
const generateUniqueCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// @desc Admin: View vouchers assigned to a partner
export const getPartnerVouchers = async (req, res) => {
  const partnerId = req.params.partnerId;

  const vouchers = await Voucher.find({ partner: partnerId }).populate("assignedProducts");

  res.status(200).json(vouchers);
};

// @desc User: Search voucher by code
export const searchVoucherByCode = async (req, res) => {
  const { code } = req.body;

  const voucher = await Voucher.findOne({ code }).populate("assignedProducts");

  if (!voucher) {
    return res.status(404).json({ message: "Voucher not found" });
  }

  res.status(200).json(voucher);
};

// @desc User: Apply voucher at checkout
export const applyVoucher = async (req, res) => {
  const { code, cartProductIds } = req.body;
  const userId = req.user._id;

  const voucher = await Voucher.findOne({ code }).populate("assignedProducts");

  if (!voucher) {
    return res.status(400).json({ message: "Invalid voucher code" });
  }

  // Check if max uses are exhausted
  if (voucher.usedBy.length >= voucher.maxUses) {
    return res.status(400).json({ message: "Voucher usage limit reached" });
  }

  // Check if user already used (for non-generic vouchers)
  const alreadyUsed = voucher.usedBy.some((entry) => entry.user.toString() === userId.toString());
  if (alreadyUsed && !voucher.isGeneric) {
    return res.status(400).json({ message: "You have already used this voucher" });
  }

  // Get assigned product IDs
  const assignedProductIds = voucher.assignedProducts.map((p) => p._id.toString());
  
  // Find which products in cart are eligible for discount
  const appliedProducts = cartProductIds.filter(id => assignedProductIds.includes(id));

  if (appliedProducts.length === 0) {
    return res.status(400).json({ message: "Voucher not valid for any products in your cart" });
  }

  res.status(200).json({
    discountPercentage: voucher.discountPercentage,
    appliedProducts, // Return which products got the discount
    voucherId: voucher._id,
    message: "Voucher applied successfully"
  });
};

