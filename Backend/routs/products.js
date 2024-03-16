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
        .json({ message: "Something went wrong when adding the product" });
    });
});

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          err: `${err}Something went wrong while fetching all products`,
        });
    });
});

router.route("/:id").put((req, res) => {
  const id = req.params.id;
  const { Name, Price, Description } = req.body;

  Product.findByIdAndUpdate(id, { Name, Price, Description }, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json("Product not found");
      }

      res.status(200).json("Product updated successfully");
    })
    .catch((err) => {
      res.status(400).json(`${err} : Product update unsuccessful`);
    });
});

router.route("/:id").delete((req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json("Product not found");
      }
      res.status(200).json("Prduct removed successfully");
    })
    .catch((err) => {
      res.status(400).json(`${err} : Product removal unsuccessful`);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let itemId = req.params.id;
  const item = await Product.findById(itemId)
    .then((item) => {
      res.status(200).json({ message: " Data retreival successfull !!! ", item});
    })
    .catch((err) => {
      res.status(400).json(`${err} : Data retreival unsuccessful !!! `);
    });
});

module.exports = router;
