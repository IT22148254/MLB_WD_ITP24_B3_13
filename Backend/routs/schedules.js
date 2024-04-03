const router = require("express").Router();
const Schedule = require("../models/schedule");


router.route("/add").post((req, res) => {
  const { TimeSlot, Day, Trainer } = req.body;

  const newSchedule = new Schedule({
    TimeSlot,
    Day,
    Trainer
  });

  newSchedule
    .save()
    .then(() => {
      res.status(200).json({ message: "Schedule added successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Something went wrong when adding the Schedule", err });
    });
});

router.route("/").get((req, res) => {
    Schedule.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Something went wrong while fetching all schedules ${err}`,
      });
    });
});

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { TimeSlot, Day, Trainer } = req.body;

    const result = await Schedule.findByIdAndUpdate(
      id,
      { TimeSlot, Day, Trainer },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({message:"Schedule not found"});
    }

    return res.status(200).json({message:"Schedule updated successfully"});
  } catch (error) {
    return res.status(400).json({message:` Schedule update unsuccessful ${error}`});
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Schedule.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    return res.status(200).json({ message: "Schedule removed successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Schedule removal unsuccesfull ${error}` });
  }
});

router.route("/get/:id").get(async (req, res) => {
  try {
    let itemId = req.params.id;
    const item = await Schedule.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: " Schedule not found " });
    }

    return res
      .status(200)
      .json({ message: " Data retreival successfull !!! ", Item: item });
  } catch (error) {
    return res.status(400).json({message:`Data retreival unsuccessful ${error} `});
  }
});

module.exports = router;