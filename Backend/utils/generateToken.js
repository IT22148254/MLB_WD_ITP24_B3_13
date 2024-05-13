const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  // create json web token
  const token = jwt.sign({ userId }, process.env.JWT_SEC, {
    expiresIn: "7d",
  });

  //set token as http only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = { generateToken };
