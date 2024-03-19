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
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User fetched successfully", User: user });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `User fetching unsuccessful ${err}` });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const uid = req.params.id;
    const { Fname, Lname, Phone, Email, Dob } = req.body;

    const result = await User.findByIdAndUpdate(uid, {
      Fname,
      Lname,
      Phone,
      Email,
      Dob,
    });

    if (!result) {
      return res.status(404).json({ message: " User not found " });
    }
    return res.status(200).json({ message: " User update successful " });
  } catch (err) {
    return res.status(400).json({ message: `User update unsuccessful ${err}` });
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const uid = req.params.id;

    const result = await User.findByIdAndDelete(uid);
    if (!result) {
      return res.status(404).json({ message: " User not found " });
    }

    return res.status(200).json({ message: " User deleted successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: ` User deleted unsuccessfully ${error}` });
  }
});

module.exports = router;
