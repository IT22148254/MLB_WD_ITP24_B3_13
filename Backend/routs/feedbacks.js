const router = require("express").Router();
let FeedBack = require("../models/feedback");

router.route("/add").post((req, res) => {
  const { UserName, Comment, Rating } = req.body;

  const newFeedBack = FeedBack({
    UserName,
    Comment,
    Rating,
  });

  newFeedBack
    .save()
    .then(() => {
      res.status(200).json({ message: " Feed-back added successfully " });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: ` Feed-back adding not successful ${err} ` });
    });
});

router.route("/").get((req, res) => {
  FeedBack.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Feedbacks fetching unsuccessful ${err}` });
    });
});

router.route("/get/:id").get(async (req, res) => {
  try {
    const feedback = await FeedBack.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found " });
    }

    return res
      .status(200)
      .json({ message: "Feedback fetched successfully", FeedBack: feedback });
  } catch (error) {
    return res
      .status(400)
      .json({ message: " Feedback fetching was unsuccessfull " });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const { UserName, Comment, Rating } = req.body;

    const feedback = await FeedBack.findByIdAndUpdate(
      req.params.id,
      { UserName, Comment, Rating },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: " Feedback not found " });
    }

    return res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback update unsuccessful ${error}` });
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const feedback = await FeedBack.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ message: "Feedback deleted succesfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback deleting unsuccessful ${error}` });
  }
});

module.exports = router;
