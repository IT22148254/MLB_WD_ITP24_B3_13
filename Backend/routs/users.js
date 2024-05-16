const router = require("express").Router();
let User = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const { admin, protect } = require("../Middleware/authMiddleware");
// ================================================================================================================================================
//=================================================================user============================================================================
// ================================================================================================================================================

//adding user

router.route("/add").post(async (req, res) => {
  try {
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

    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

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

    newUser.save();
    generateToken(res, newUser._id);
    res.status(200).json({ message: " User added successfully " });
  } catch (error) {
    res.status(400).json({ message: `User adding unsuccessful !!! ${error}` });
  }
  // newUser
  //   .save()
  //   .then(() => {
  //     res.status(200).json({ message: " User added successfully " });
  //     generateToken(res, newUser._id);
  //   })
  //   .catch((err) => {
  //     res.status(400).json({ message: `User adding unsuccessful !!! ${err}` });
  //   });
});

//get all user

router.route("/").get(protect, admin, (req, res) => {
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

router.route("/get/:id").get(protect, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate([
      { path: "Package", select: "Name Duration" },
      { path: "PrPackage", select: "Name Duration" },
      { path: "CustomerSchedule", select: "Date TimeSlot" },
      { path: "CoachSchedule", select: "Day TimeSlot" },
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `User fetching unsuccessful ${err}` });
  }
});

//update user

router.route("/:id").put(protect, async (req, res) => {
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
      Package,
      PrPackage,
      CustomerSchedule,
      CoachSchedule,
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
        Package,
        PrPackage,
        CustomerSchedule,
        CoachSchedule,
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

router.route("/:id").delete(protect, admin, async (req, res) => {
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

//login + create cookie

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ Email: email });

  if (user && (await user.matchPassWord(password))) {
    generateToken(res, user._id);

    return res.status(200).json({
      _id: user._id,
      Fname: user.Fname,
      Email: user.Email,
      AccLevel: user.AccLevel,
    });
  } else {
    return res.status(401).json({ message: "Unauthorised access" });
  }
});

// logout + clear cookie

router.route("/logout").post(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
