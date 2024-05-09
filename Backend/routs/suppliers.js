const router = require("express").Router();
const {Supplier,Order,Report} = require("../models/supplier");



// ================================================================================================================================================
//=================================================================Supplier========================================================================
// ================================================================================================================================================



//add new supplier

router.route("/add").post((req, res) => {
  const { Name, Email, Phone, Address} = req.body;

  const newSupplier = Supplier({
    Name,
    Email,
    Phone,
    Address
  });

  newSupplier
    .save()
    .then(() => {
      res.status(200).json({ message: "Supplier added successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Supplier addition unsuccessful ${err}` });
    });
});



//get all suppliers

router.route("/").get((req, res) => {
  Supplier.find()
    .then((result) => {
      res.status(200).json({result});
    })
    .catch((err) => {
      res.status(200).json({ message: "Sppliers fetching unsuccessful" });
    });
});



//get one supplier

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



//update supplier

router.route("/:id").put(async (req, res) => {
  try {
    const { Name, Email, Phone, Address } = req.body;
    const {id} = req.params;
    const supplier = await Supplier.findByIdAndUpdate(
      {_id: id},
      {
        Name,
        Email,
        Phone,
        Address
      }

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



//delete supplier

router.route("/:id").delete(async (req, res) => {
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



// ================================================================================================================================================
//=================================================================SupplierReport==================================================================
// ================================================================================================================================================



//creating a report

router.route("/report/add").post((req, res) => {
  const { Date, Category } = req.body;

  const newReport = Report({
    Date,
    Category,
  });

  newReport
    .save()
    .then(() => {
      res.status(200).json({ message: "report added successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `report addition unsuccessful ${err}` });
    });
});



//get all reports

router.route("/report/").get((req, res) => {
  Report.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(200).json({ message: "report fetching unsuccessful" });
    });
});


//get one report

router.route("/report/get/:id").get(async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "report not found" });
    }
    return res
      .status(200)
      .json({ message: "report fetched successfully", report });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `report fetching unsuccessful ${error}` });
  }
});



//update report

router.route("/report/:id").put(async (req, res) => {
  try {
    const { Date, Category } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { Date, Category },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "report not found" });
    }

    return res.status(200).json({ message: "report updated successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `report updating unsuccessful ${error}` });
  }
});



//delete report

router.route("/report/:id").delete(async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ message: "Supplier deleted successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Supplier deleting unsuccessful ${error}` });
  }
});




// ================================================================================================================================================
//=================================================================Order===========================================================================
// ================================================================================================================================================



//creating a order

router.route("/order/add").post((req, res) => {
  const { Supplier, PrName,quantity} = req.body;

  const newOrder = Order({
    Supplier,
    PrName,
    quantity,
  });

  newOrder
    .save()
    .then(() => {
      res.status(200).json({ message: "order added successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `order addition unsuccessful ${err}` });
    });
});



//get all orders

router.route("/order/").get((req, res) => {
  Order.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(200).json({ message: "order fetching unsuccessful" });
    });
});


//get one order

router.route("/order/get/:id").get(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    return res
      .status(200)
      .json({ message: "order fetched successfully", order });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `order fetching unsuccessful ${error}` });
  }
});



//update order

router.route("/order/:id").put(async (req, res) => {
  try {
    const { Supplier,PrName,quantity} = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { Supplier,PrName,quantity},
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.status(200).json({ message: "order updated successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `order updating unsuccessful ${error}` });
  }
});



//delete order

router.route("/order/:id").delete(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.status(200).json({ message: "order deleted successfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `order deleting unsuccessful ${error}` });
  }
});

module.exports = router;
