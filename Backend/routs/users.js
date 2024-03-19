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
      res.status(400).json({ message: `User adding unsuccessful !!! ${err}` });
    });
});

router.route("/").get((req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Error while fetching all users ${err} ` });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await User.findById(userId)
    .then((user) => {
      res
        .status(200)
        .json({ message: " User fetched successfully ", User: user });
    })
    .catch((err) => {
      res.status(400).json({ message: ` User fetching unsuccessful ${err}` });
    });
});

module.exports = router;
