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

  const crMail = await newMarEmail
    .save()
    .then(() => {
      res.status(200).json({ message: " Email added successfully " });
    })
    .catch((err) => {
      res.status(400).json({ message: `Email adding unsuccessful !!! ${err}` });
    });
});

//get all emails

router.route("/package/").get((req, res) => {
  Package.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `Packages fetching went wrong ${err}` });
    });
});

module.exports=router