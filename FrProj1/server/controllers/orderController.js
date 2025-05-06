import Order from "../models/Order.js";
import Voucher from "../models/Voucher.js";
import Product from "../models/Product.js";

// @desc Create new order
export const createOrder = async (req, res) => {
  const { orderedProducts, voucherCode } = req.body;
  const userId = req.user._id;

  let totalPrice = 0;
  let appliedVoucher = null;

  // Calculate total price without discount
  for (const item of orderedProducts) {
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(404).json({ message: `Product not found: ${item.product}` });
    }
    totalPrice += product.price * item.quantity;
  }

  // Handle voucher if applied
  if (voucherCode) {
    const voucher = await Voucher.findOne({ code: voucherCode });
    
    if (!voucher) {
      return res.status(400).json({ message: "Invalid voucher code" });
    }

    // Check if max uses are exhausted (only necessary recheck)
    if (voucher.usedBy.length >= voucher.maxUses) {
      return res.status(400).json({ message: "Voucher usage limit reached" });
    }

    // Apply discount (trust applyVoucher’s prior validation)
    totalPrice = totalPrice - (totalPrice * voucher.discountPercentage / 100);

    appliedVoucher = voucher;

    // Track usage (once per order)
    voucher.usedBy.push({
      user: userId,
      usedAt: new Date(),
    });

    await voucher.save();
  }

  const order = await Order.create({
    user: userId,
    orderedProducts,
    voucher: appliedVoucher ? appliedVoucher._id : undefined,
    totalPrice,
    isPaid: true,
    paidAt: Date.now(),
  });

  res.status(201).json(order);
};

// @desc Get logged-in user's orders
export const getUserOrders = async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId })
    .populate("orderedProducts.product")
    .populate("voucher");

  res.status(200).json(orders);
};


// @desc Get a single order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  try {
    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate("orderedProducts.product")
      .populate("voucher");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch order" });
  }
};

// @desc Admin: Get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .populate("orderedProducts.product")
    .populate("voucher");

  res.status(200).json(orders);
};