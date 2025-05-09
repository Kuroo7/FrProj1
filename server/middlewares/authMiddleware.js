import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
export const isPartner = (req, res, next) => {
  if (req.user && req.user.role === "partner") {
    next();
  } else {
    res.status(403).json({ message: "Partner access only" });
  }
};

export const isNotUser = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "partner")) {
    next();
  } else {
    res.status(403).json({ message: "Access restricted for normal users" });
  }
};
