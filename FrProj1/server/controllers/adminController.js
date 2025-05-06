import User from "../models/User.js";
import Product from "../models/Product.js";
import Voucher from "../models/Voucher.js";
import Order from "../models/Order.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalVouchers = await Voucher.countDocuments();
    const totalOrders = await Order.countDocuments();
    const revenueData = await Order.find();

    const totalRevenue = revenueData.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalVouchers,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Don't send passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// @desc Admin: Update a user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body; // Update allowed fields only
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role; // role: 'user' | 'partner' | 'admin'

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// @desc Admin: Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};


// @desc Get all partners with their voucher counts
export const getPartnersWithVoucherStats = async (req, res) => {
    try {
      // Get all users who are partners
      const partners = await User.find({ role: "partner" });
  
      // For each partner, get voucher stats
      const partnerStats = await Promise.all(
        partners.map(async (partner) => {
          const totalVouchers = await Voucher.countDocuments({ partner: partner._id });
          const usedVouchers = await Voucher.countDocuments({
            partner: partner._id,
            usedBy: { $exists: true, $not: { $size: 0 } } // vouchers where usedBy array is not empty
          });
  
          return {
            _id: partner._id,
            name: partner.name,
            email: partner.email,
            totalVouchers,
            usedVouchers
          };
        })
      );
  
      res.status(200).json(partnerStats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching partners" });
    }
  };
  