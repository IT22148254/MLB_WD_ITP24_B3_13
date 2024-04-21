const router = require("express").Router();
let User = require("../models/user");

// ================================================================================================================================================
//=================================================================user============================================================================
// ================================================================================================================================================

//adding user

router.route("/add").post((req, res) => {
  const {
    Fname,
    Lname,
    Address,
    Gender,
    NIC,
    Phone,
    Email,
    Password,
    Dob,
    AccLevel,
  } = req.body;

  const newUser = new User({
    Fname,
    Lname,
    Address,
    Gender,
    NIC,
    Phone,
    Email,
    Password,
    Dob,
    AccLevel,
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

//get all user

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

//get one user

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

//update user

router.route("/:id").put(async (req, res) => {
  try {
    const uid = req.params.id;
    const {
      Fname,
      Lname,
      Address,
      Gender,
      NIC,
      Phone,
      Email,
      Password,
      Dob,
      AccLevel,
    } = req.body;

    const result = await User.findByIdAndUpdate(
      uid,
      {
        Fname,
        Lname,
        Address,
        Gender,
        NIC,
        Phone,
        Email,
        Password,
        Dob,
        AccLevel,
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: " User not found " });
    }
    return res.status(200).json({ message: " User update successful " });
  } catch (err) {
    return res.status(400).json({ message: `User update unsuccessful ${err}` });
  }
});

//delete user

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

//utility routs

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ Email: email });

  if (user && (await user.matchPassWord(password))) {
    return res.status(200).json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      AccLevel: user.AccLevel,
    });
  } else {
    return res.status(401).json({ message: "Unauthorised access" });
  }
});

module.exports = router;
