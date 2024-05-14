const router = require("express").Router();
const {
  CoachFeedBack,
  ServiceFeedBack,
  ApproveFeedBack,
  SaFeedBack
} = require("../models/feedback");

// ================================================================================================================================================
//=================================================================Service Feedback================================================================
// ================================================================================================================================================

//add new Service Feedback

router.route("/service/add").post((req, res) => {
  const { UserName, Comment, Rating, Email } = req.body;

  const newServiceFeedBack = ServiceFeedBack({
    UserName,
    Comment,
    Rating,
    Email,
  });

  newServiceFeedBack
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

//Get all Service Feedbacks

router.route("/service/").get((req, res) => {
  ServiceFeedBack.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Feedbacks fetching unsuccessful ${err}` });
    });
});

//Get one Service Feedback

router.route("/service/get/:id").get(async (req, res) => {
  try {
    const servicefeedback = await ServiceFeedBack.findById(req.params.id);

    if (!servicefeedback) {
      return res.status(404).json({ message: "Feedback not found " });
    }

    return res.status(200).json({
      message: "Feedback fetched successfully",
      ServiceFeedBack: servicefeedback,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: " Feedback fetching was unsuccessfull " });
  }
});

//Update Service Feedback

router.route("/service/:id").put(async (req, res) => {
  try {
    const { UserName, Comment, Rating, Email } = req.body;

    const { id } = req.params;
    const servicefeedback = await ServiceFeedBack.findByIdAndUpdate(
      { _id: id },
      { UserName, Comment, Rating, Email }
    );

    if (!servicefeedback) {
      return res.status(404).json({ message: " Feedback not found " });
    }

    return res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback update unsuccessful ${error}` });
  }
});

//Delete Service Feedback

router.route("/service/:id").delete(async (req, res) => {
  try {
    const servicefeedback = await ServiceFeedBack.findByIdAndDelete(
      req.params.id
    );

    if (!servicefeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ message: "Feedback deleted succesfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback deleting unsuccessful ${error}` });
  }
});

// ================================================================================================================================================
//=================================================================Coach Feedback==================================================================
// ================================================================================================================================================

//add new Coach Feedback

router.route("/coach/add").post((req, res) => {
  const { UserName, Comment, Rating, Email, Coach } = req.body;

  const newCoachFeedBack = CoachFeedBack({
    UserName,
    Comment,
    Rating,
    Email,
    Coach,
  });

  newCoachFeedBack
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

//Get all Coach Feedbacks

router.route("/coach/").get((req, res) => {
  CoachFeedBack.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Feedbacks fetching unsuccessful ${err}` });
    });
});

//Get one Coach Feedback

router.route("/coach/get/:id").get(async (req, res) => {
  try {
    const coachfeedback = await CoachFeedBack.findById(req.params.id);

    if (!coachfeedback) {
      return res.status(404).json({ message: "Feedback not found " });
    }

    return res.status(200).json({
      message: "Feedback fetched successfully",
      CoachFeedBack: coachfeedback,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: " Feedback fetching was unsuccessfull " });
  }
});

//Update Coach Feedback

router.route("/coach/:id").put(async (req, res) => {
  try {
    const { UserName, Comment, Rating, Email, Coach } = req.body;

    const coachfeedback = await CoachFeedBack.findByIdAndUpdate(
      req.params.id,
      { UserName, Comment, Rating, Email, Coach },
      { new: true }
    );

    if (!coachfeedback) {
      return res.status(404).json({ message: " Feedback not found " });
    }

    return res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback update unsuccessful ${error}` });
  }
});

//Delete Coach Feedback

router.route("/coach/:id").delete(async (req, res) => {
  try {
    const coachfeedback = await CoachFeedBack.findByIdAndDelete(req.params.id);

    if (!coachfeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ message: "Feedback deleted succesfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback deleting unsuccessful ${error}` });
  }
});

// ================================================================================================================================================
//=================================================================Coach Feedback==================================================================
// ================================================================================================================================================

//add new Coach Feedback

router.route("/coacha/add").post((req, res) => {
  const { UserName, Comment, Rating, Email, Coach } = req.body;

  const newApproveFeedBack = ApproveFeedBack({
    UserName,
    Comment,
    Rating,
    Email,
    Coach,
  });

  newApproveFeedBack
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

//Get all Coach Feedbacks

router.route("/coacha/").get((req, res) => {
  ApproveFeedBack.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Feedbacks fetching unsuccessful ${err}` });
    });
});

//Get one Coach Feedback

router.route("/coacha/get/:id").get(async (req, res) => {
  try {
    const approvefeedback = await ApproveFeedBack.findById(req.params.id);

    if (!approvefeedback) {
      return res.status(404).json({ message: "Feedback not found " });
    }

    return res.status(200).json({
      message: "Feedback fetched successfully",
      ApproveFeedBack: approvefeedback,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: " Feedback fetching was unsuccessfull " });
  }
});

//Update Coach Feedback

router.route("/coacha/:id").put(async (req, res) => {
  try {
    const { UserName, Comment, Rating, Email, Coach } = req.body;

    const approvefeedback = await ApproveFeedBack.findByIdAndUpdate(
      req.params.id,
      { UserName, Comment, Rating, Email, Coach },
      { new: true }
    );

    if (!approvefeedback) {
      return res.status(404).json({ message: " Feedback not found " });
    }

    return res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback update unsuccessful ${error}` });
  }
});

//Delete Coach Feedback

router.route("/coacha/:id").delete(async (req, res) => {
  try {
    const approvefeedback = await CoachFeedBack.findByIdAndDelete(
      req.params.id
    );

    if (!approvefeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ message: "Feedback deleted succesfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback deleting unsuccessful ${error}` });
  }
});



       









//add new Service Feedback

router.route("/servicea/add").post((req, res) => {
  const { UserName, Comment, Rating, Email } = req.body;

  const newSaFeedBack = SaFeedBack({
    UserName,
    Comment,
    Rating,
    Email,
  });

  newSaFeedBack
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

//Get all Service Feedbacks

router.route("/servicea/").get((req, res) => {
  SaFeedBack.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Feedbacks fetching unsuccessful ${err}` });
    });
});

//Get one Service Feedback

router.route("/servicea/get/:id").get(async (req, res) => {
  try {
    const safeedback = await SaFeedBack.findById(req.params.id);

    if (!safeedback) {
      return res.status(404).json({ message: "Feedback not found " });
    }

    return res.status(200).json({
      message: "Feedback fetched successfully",
      SaFeedBack: safeedback,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: " Feedback fetching was unsuccessfull " });
  }
});

//Update Service Feedback

router.route("/servicea/:id").put(async (req, res) => {
  try {
    const { UserName, Comment, Rating, Email } = req.body;

    const { id } = req.params;
    const safeedback = await SaFeedBack.findByIdAndUpdate(
      { _id: id },
      { UserName, Comment, Rating, Email }
    );

    if (!safeedback) {
      return res.status(404).json({ message: " Feedback not found " });
    }

    return res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Feedback update unsuccessful ${error}` });
  }
});

//Delete Service Feedback

router.route("/servicea/:id").delete(async (req, res) => {
  try {
    const safeedback = await SaFeedBack.findByIdAndDelete(
      req.params.id
    );

    if (!servicefeedback) {
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
