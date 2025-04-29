import Product from "../models/Product.js";

// @desc Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      isBestSeller,
      price,
      imageUrls,
      stock,
      category,
      tags,
      available,
      variants,
      options
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      imageUrls,
      stock,
      category,
      tags,
      available,
      isBestSeller,
      variants,
      options
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrls,
      stock,
      category,
      tags,
      available,
      isBestSeller,
      variants,
      options
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.imageUrls = imageUrls ?? product.imageUrls;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;
    product.tags = tags ?? product.tags;
    product.available = available ?? product.available;
    product.isBestSeller = isBestSeller ?? product.isBestSeller;
    product.variants = variants ?? product.variants;
    product.options = options ?? product.options;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
