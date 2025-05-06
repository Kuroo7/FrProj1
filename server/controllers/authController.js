import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Register User with Phone Verification
export const registerUser = async (req, res) => {
  const { name, email, password, role, phoneIdToken } = req.body;

  if (!name || !email || !password || !phoneIdToken) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Verify the phone ID token
    const decodedToken = await admin.auth().verifyIdToken(phoneIdToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Invalid phone token" });
    }

    // Check if user already exists by email or phone number
    const userExists = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Send response
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login with Email and Password
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id, user.email, user.role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

// Login with Phone Number
export const loginWithPhone = async (req, res) => {
  const { phoneIdToken } = req.body;

  if (!phoneIdToken) {
    return res.status(400).json({ message: "Phone ID token is required" });
  }

  try {
    // Verify the phone ID token
    const decodedToken = await admin.auth().verifyIdToken(phoneIdToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Invalid phone token" });
    }

    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Send response
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

// Get User Profile
export const getProfile = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No token found" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    res.json(decoded);
  });
};