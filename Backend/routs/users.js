const router = require("express").Router();
let User = require("../models/user");

router.route("/add").post((req, res) => {
  const { Fname, Lname, Phone, Email, Dob } = req.body;

  const newUser = new User({
    Fname,
    Lname,
    Phone,
    Email,
    Dob,
  });

  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: " User added successfully " });
    })
    .catch((err) => {
      res.status(400).json({ message: " User adding unsuccessful !!! ", err });
    });
});

module.exports = router;