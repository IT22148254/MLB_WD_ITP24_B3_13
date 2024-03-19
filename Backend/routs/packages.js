const router = require("express").Router();
const FeedBack = require("../models/feedback");
let Package = require("../models/package");

router.route("/add").post((req, res) => {
  const { Name, Price, Duration, Discription } = req.body;

  const newPackage = Package({
    Name,
    Price,
    Duration,
    Discription,
  });

  newPackage
    .save()
    .then(() => {
      res.status(200).json({ message: "Package added succesfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: `Package addition unsuccessful ${err}` });
    });
});

router.route("/").get((req, res) => {
  Package.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ message: `Packages fetching went wrong ${err}` });
    });
});

router.route("/get/:id").get(async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    return res.status(200).json({ pkg });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Package fetching unsuccessful ${error}` });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const { Name, Price, Duration, Discription } = req.body;
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { Name, Price, Duration, Discription },
      { new: true }
    );

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ message: "Package updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Package updating unsuccessful ${error}` });
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const pkg =await Package.findByIdAndDelete(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Packed deleting unsuccessful ${error}` });
  }
});

module.exports = router;
