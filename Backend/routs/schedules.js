const router = require("express").Router();
const { CoachSchedule, CustomerSchedule } = require("../models/schedule");

// ================================================================================================================================================
//=================================================================Coach Schedule==================================================================
// ================================================================================================================================================

//add new Coach Schedule

router.route("/coachSchedule/add").post((req, res) => {
  const { TimeSlot, Day, Trainer } = req.body;

  const newSchedule = new CoachSchedule({
    TimeSlot,
    Day,
    Trainer,
  });

  newSchedule
    .save()
    .then(() => {
      res.status(200).json({ message: "Schedule added successfully" });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong when adding the Schedule",
        err,
      });
    });
});

//get all Coach Schedules

router.route("/coachSchedule/").get((req, res) => {
  CoachSchedule.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Something went wrong while fetching all schedules ${err}`,
      });
    });
});

//update Coach Schedule

router.route("/coachSchedule/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { TimeSlot, Day, Trainer } = req.body;

    const result = await CoachSchedule.findByIdAndUpdate(
      id,
      { TimeSlot, Day, Trainer },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: ` Schedule update unsuccessful ${error}` });
  }
});

//delete Coach Schedule

router.route("/coachSchedule/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await CoachSchedule.findByIdAndDelete(id);
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

//get one Coach Schedule

router.route("/get/:id").get(async (req, res) => {
  try {
    let itemId = req.params.id;
    const result = await CoachSchedule.findById(itemId);

    if (!result) {
      return res.status(404).json({ message: " Schedule not found " });
    }

    return res
      .status(200)
      .json({ message: " Data retreival successfull !!! ", result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Data retreival unsuccessful ${error} ` });
  }
});

// ================================================================================================================================================
//=================================================================Customer Schedule===============================================================
// ================================================================================================================================================

//add new customer Schedule

router.route("/customerSchedule/add").post((req, res) => {
  const { Date, TimeSlot, Section } = req.body;

  const newSchedule = new CustomerSchedule({
    Date,
    TimeSlot,
    Section,
  });

  newSchedule
    .save()
    .then(() => {
      res.status(200).json({ message: "Schedule added successfully" });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong when adding the Schedule",
        err,
      });
    });
});

//get all customer Schedules

router.route("/customerSchedule/").get((req, res) => {
  CustomerSchedule.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Something went wrong while fetching all schedules ${err}`,
      });
    });
});

//update customer Schedule

router.route("/customerSchedule/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { Date, TimeSlot, Section } = req.body;

    const result = await CustomerSchedule.findByIdAndUpdate(
      id,
      { Date, TimeSlot, Section },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: ` Schedule update unsuccessful ${error}` });
  }
});

//delete customer Schedule

router.route("/customerSchedule/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await CustomerSchedule.findByIdAndDelete(id);
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

//get one customer Schedule

router.route("/customerSchedule/get/:id").get(async (req, res) => {
  try {
    let itemId = req.params.id;
    const result = await CustomerSchedule.findById(itemId);

    if (!result) {
      return res.status(404).json({ message: " Schedule not found " });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Data retreival unsuccessful ${error} ` });
  }
});

module.exports = router;
