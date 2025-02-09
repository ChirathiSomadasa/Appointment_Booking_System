const { verifyJWT } = require("../config/auth");

// Authenticate user
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  next();
}

// Restrict access to admin-only routes
function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

module.exports = { authenticate, isAdmin };