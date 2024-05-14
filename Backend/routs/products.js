const router = require("express").Router();
let { Product, OrderSt } = require("../models/product");
const multer = require("multer");
const path = require("path");
const { admin, protect } = require("../Middleware/authMiddleware");

router.route("/add").post(async (req, res) => {
  const product = new Product({
    name: "sample name",
    image: "/images/sample.jpg",
    price: 0,
    description: "sample description",
    brand: "Sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    rating: 0,
  });
  // } = req.body;

  // const newProduct = new Product({
  //   name,
  //   price,
  //   description,
  //   countInStock,
  //   image,
  //   brand,
  //   category,
  //   numReviews,
  //   rating,
  //   reviews,
  // });

  await product
    .save()
    .then(() => {
      res.status(200).json(product);
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
    const {
      name,
      image,
      price,
      description,
      brand,
      category,
      countInStock,
      numReviews,
      rating,
      reviews,
    } = req.body;

    const result = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        price,
        description,
        brand,
        category,
        countInStock,
        numReviews,
        rating,
        reviews,
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ message: ` Product update unsuccessful ${error}` });
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

    return res.status(200).json(item);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Data retreival unsuccessful ${error} ` });
  }
});

router.route("/orderst/add").post(protect, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400);
  } else {
    const newOrder = new OrderSt({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
    });

    await newOrder.save();
    return res.status(200).json(newOrder);
  }
});

router.route("/orderst/").get(protect, admin, async (req, res) => {
  //res.send("get all orders");

  await OrderSt.find()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(400).json({ message: `Could not get orders ${err}` });
    });
});

router.route("/orderst/get/:id").get(protect, async (req, res) => {
  const order = await OrderSt.findById(req.params.id).populate(
    "user",
    "Fname Email"
  );
  if (order) {
    return res.status(200).json(order);
  } else {
    return res.status(404).json({ message: "error -> cannot get order by id" });
  }
});

router.route("/orderst/myorders/:id").get(protect, async (req, res) => {
  const orders = await OrderSt.find({ user: req.params.id });
  return res.status(200).json(orders);
});

router.route("/orderst/:id/pay").put(protect, async (req, res) => {
  //res.send("update is paid");
  try {
    const id = req.params.id;
    const { isPaid, paidAt } = req.body;
    const result = await OrderSt.findByIdAndUpdate(id, { isPaid, paidAt });
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      return res.status(200).json({ message: "Order paid successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Order payment unsuccessful ${error}` });
  }
});

router.route("/orderst/:id/deliver").put(protect, admin, async (req, res) => {
  // res.send("update is delivered");

  try {
    const id = req.params.id;
    const { isDelivered, deliveredAt } = req.body;
    const result = await OrderSt.findByIdAndUpdate(id, {
      isDelivered,
      deliveredAt,
    });
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      return res.status(200).json({ message: "Order paid successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Order payment unsuccessful ${error}` });
  }
});

router.route("/orderst/:id").put(protect, admin, async (req, res) => {
  //res.send("update order");

  try {
    const id = req.params.id;
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    } = req.body;

    const result = await OrderSt.findByIdAndUpdate(
      id,
      {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Order update unsuccessful ${error}` });
  }
});

router.route("/orderst/:id").delete(protect, admin, async (req, res) => {
  //res.send("delete order");

  try {
    const id = req.params.id;
    const result = await OrderSt.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      return res.status(200).json({ message: "Order deleted successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Order deletion unsuccessful ${error}` });
  }
});

//===========================================================================================================================================

module.exports = router;
