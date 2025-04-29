import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  title: String,
  sku: String,
  price: Number,
  compareAtPrice: Number,
  available: Boolean,
  inventoryManagement: String,
  options: [String]
});

const optionSchema = new mongoose.Schema({
  name: String,
  position: Number,
  values: [String]
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String], // Changed from `imageUrl` to `imageUrls`
    default: [],
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  available: {
    type: Boolean,
    default: true,
  },
  variants: [variantSchema],
  options: [optionSchema],
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
