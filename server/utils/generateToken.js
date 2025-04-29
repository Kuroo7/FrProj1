import jwt from "jsonwebtoken";

const generateToken = (id,email,role) => {
  
  return jwt.sign({ id,role,email }, process.env.JWT_SECRET, {
    expiresIn: "7d", // token expires in 7 days
  });
};

export default generateToken;