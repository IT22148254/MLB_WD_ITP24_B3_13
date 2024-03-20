const router = require("express").Router();
let Supplier = require("../models/supplier");

router.route("/add").post((req, res) => {
  const { Name, Product, UnitPrice, BrandName, PurchasedAmnt } = req.body;

  const newSupplier = Supplier({
    Name,
    Product,
    UnitPrice,
    BrandName,
    PurchasedAmnt,
  });

  newSupplier
    .save()
    .then(() => {
      res.status(200).json({ message: "Supplier added successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: `Supplier addition unsuccessful ${err}` });
    });
});

router.route("/").get((req, res) => {
  Supplier.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(200).json({ message: "Sppliers fetching unsuccessful" });
    });
});

router.route("/get/:id").get(async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res
      .status(200)
      .json({ message: "Supplier fetched successfully", supplier });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Supplier fetching unsuccessful ${error}` });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const { Name, Product, UnitPrice, BrandName, PurchasedAmnt } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { Name, Product, BrandName, UnitPrice, PurchasedAmnt },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ message: "Supplier updated successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Supplier updating unsuccessful ${error}` });
  }
});

router.route("/:id").delete( async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ message: "Supplier deleted successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Supplier deleting unsuccessful ${error}` });
  }
});


module.exports = router;