const router = require("express").Router();
let MEmail = require("../models/email");

//add emails
router.route("/add").post(async(req, res) => {
  const {title, subject, content} = req.body;

  const newMarEmail = new MEmail({
    title,
    subject,
    content,
  });

  await newMarEmail
    .save()
    .then(() => {
      res.status(200).json(newMarEmail);
    })
    .catch((err) => {
      res.status(400).json({ message: `Email adding unsuccessful !!! ${err}` });
    });
});

//get all emails

router.route("/").get((req, res) => {
  MEmail.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `Packages fetching went wrong ${err}` });
    });
});

// get email by id

router.route("/get/:id").get(async (req, res) => {
  try {
    const email = await MEmail.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ message: "Email not found " });
    }

    return res
      .status(200)
      .json(email);
  } catch (error) {
    return res
      .status(400)
      .json({ message: " Feedback fetching was unsuccessfull " });
  }
});

// update email

router.route("/:id").put(async (req, res) => {
  try {
    const {title, subject, content} = req.body;

    const email = await MEmail.findByIdAndUpdate(
      req.params.id,
      { title, subject, content},
      { new: true }
    );

    if (!email) {
      return res.status(404).json({ message: " Email not found " });
    }

    return res.status(200).json(email);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Email update unsuccessful ${error}` });
  }
});

//Delete Service Feedback

router.route("/:id").delete(async (req, res) => {
  try {
    const email = await MEmail.findByIdAndDelete(
      req.params.id
    );

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    return res.status(200).json(email);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Email deleting unsuccessful ${error}` });
  }
});


module.exports=router