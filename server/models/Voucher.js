import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // the partner who owns this voucher
    required: false,
  },
  assignedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  discountPercentage: {
    type: Number,
    default: 0,
  },
  maxUses: {
    type: Number,
    required: true,
    default: 1, // each voucher can be used only once by default
  },
  usedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    usedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  isGeneric: {
    type: Boolean,
    default: false, // if true, any user can use
  },
  active: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.model("Voucher", voucherSchema);
