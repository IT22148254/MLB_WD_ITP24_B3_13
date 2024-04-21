const jwt = require("jsonwebtoken");
const User = require("../models/user");

//protected routes
const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SEC);
      req.user = await User.findById(decoded.userId).select("-Password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Authentication token failed" });
    }
  } else {
    return res.status(401).json({ message: "Unauthrised access" });
  }
};

//admin middleware

const admin = async (req, res, next) => {
  if (req.user && (req.user.AccLevel !== "customer")) {
    next();
  } else {
    return res.status(401).json({ message: "Authorised only for admins" });
  }
};

module.exports = { protect, admin };
