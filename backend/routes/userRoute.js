const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");


router.post(
  "/register",

  async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role:"users"
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);






router.post(
  "/login",
  async (req, res) => {


    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }


      if (req.body.password === userData.password) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      
      let userRole = userData.role;
      let userEmail = userData.email;

      return res.json({ success: true, userRole:userRole, userEmail:userEmail})

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
