const router = require("express").Router();
let MEmail = require("../models/email");

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

module.exports=router