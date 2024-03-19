const router = require("express").Router();
let Product = require("../models/product");

router.route("/add").post((req, res) => {
  const { Name, Price, Description, Stock, Sold } = req.body;

  const newProduct = new Product({
    Name,
    Price,
    Description,
    Stock,
    Sold,
  });

  newProduct
    .save()
    .then(() => {
      res.status(200).json({ message: "Product added successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Something went wrong when adding the product", err });
    });
});

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Something went wrong while fetching all products ${err}`,
      });
    });
});

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { Name, Price, Description } = req.body;

    const result = await Product.findByIdAndUpdate(
      id,
      { Name, Price, Description },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({message:"Product not found"});
    }

    return res.status(200).json({message:"Product updated successfully"});
  } catch (error) {
    return res.status(400).json({message:` Product update unsuccessful ${error}`});
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `product removal unsuccesfull ${error}` });
  }
});

router.route("/get/:id").get(async (req, res) => {
  try {
    let itemId = req.params.id;
    const item = await Product.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: " Product not found " });
    }

    return res
      .status(200)
      .json({ message: " Data retreival successfull !!! ", Item: item });
  } catch (error) {
    return res.status(400).json({message:`Data retreival unsuccessful ${error} `});
  }
});

module.exports = router;
