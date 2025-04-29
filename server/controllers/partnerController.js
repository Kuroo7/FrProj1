import Voucher from "../models/Voucher.js";

// @desc Get all vouchers for a partner with used info
export const getPartnerVouchersDetailed = async (req, res) => {
    try {
      const { partnerId } = req.params;
  
      const vouchers = await Voucher.find({ partner: partnerId })
        .populate("assignedProducts", "name") // optional: show product names
        .populate("usedBy.user", "name email"); // optional: show who used
  
      // Format voucher details
      const detailedVouchers = vouchers.map(voucher => ({
        _id: voucher._id,
        code: voucher.code,
        assignedProducts: voucher.assignedProducts,
        discountPercentage: voucher.discountPercentage,
        maxUses: voucher.maxUses,
        totalUses: voucher.usedBy.length,
        isUsed: voucher.usedBy.length > 0,
        isGeneric: voucher.isGeneric,
        active: voucher.active,
        createdAt: voucher.createdAt,
      }));
  
      res.status(200).json(detailedVouchers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching vouchers" });
    }
  };
  