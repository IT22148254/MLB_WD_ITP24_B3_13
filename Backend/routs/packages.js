const router = require("express").Router();
const FeedBack = require("../models/feedback");
const { Package, PromoPackage } = require("../models/package");

// ================================================================================================================================================
//=================================================================Package=========================================================================
// ================================================================================================================================================

//add new Package

router.route("/package/add").post((req, res) => {
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

//get all Packages

router.route("/package/").get((req, res) => {
  Package.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ message: `Packages fetching went wrong ${err}` });
    });
});

//get one Package

router.route("/package/get/:id").get(async (req, res) => {
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

//Update Package

router.route("/package/:id").put(async (req, res) => {
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

//Delete Package

router.route("/package/:id").delete(async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);

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

// ================================================================================================================================================
//=================================================================Promo Package===================================================================
// ================================================================================================================================================

//add new Pro Package

router.route("/propackage/add").post((req, res) => {
  const { Name, Price, Duration, Discription } = req.body;

  const newPackage = PromoPackage({
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

//get all Packages

router.route("/propackage/").get((req, res) => {
  PromoPackage.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ message: `Packages fetching went wrong ${err}` });
    });
});

//get one Package

router.route("/propackage/get/:id").get(async (req, res) => {
  try {
    const pkg = await PromoPackage.findById(req.params.id);

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

//Update Package

router.route("/propackage/:id").put(async (req, res) => {
  try {
    const { Name, Price, Duration, Discription } = req.body;
    const pkg = await PromoPackage.findByIdAndUpdate(
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

//Delete Package

router.route("/propackage/:id").delete(async (req, res) => {
  try {
    const pkg = await PromoPackage.findByIdAndDelete(req.params.id);

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
