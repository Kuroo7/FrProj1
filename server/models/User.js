import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["user", "partner", "admin"],
    default: "user",
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, 
    // if this user is created from a partner (optional, for future if needed)
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
