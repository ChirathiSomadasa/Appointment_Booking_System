const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verify JWT token
function verifyJWT(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

const generateJWT = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // Ensure process.env.JWT_SECRET is defined
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

module.exports = { generateJWT, verifyJWT };