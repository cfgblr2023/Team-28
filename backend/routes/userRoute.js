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
      let userId = userData._id;

      return res.json({ success: true, userRole:userRole, userEmail:userEmail, userId:userId})

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
//create a session
router.post('/createSession', async (req, res) => {
    latitude=req.body.coordinatesCovered.latitude;
    longitude=req.body.coordinatesCovered.longitude;
    x={latitude,longitude};
    y=[];
    y.push(x);
    const session = new Session({
        startTimestamp: req.body.startTimestamp,
        endTimestamp:req.body.startTimestamp,
        coordinatesCovered:y,    
    });
    const createdSession = await session.save();
    res.send({
        _id: createdSession._id
    }
           
    )
});

//create a session
router.post('/createSession', async (req, res) => {
  latitude=req.body.coordinatesCovered.latitude;
  longitude=req.body.coordinatesCovered.longitude;
  x={latitude,longitude};
  y=[];
  y.push(x);
  const session = new Session({
      startTimestamp: req.body.startTimestamp,
      endTimestamp:req.body.startTimestamp,
      coordinatesCovered:y,    
  });
  const createdSession = await session.save();
  res.send({
      _id: createdSession._id
  }
         
  )
});

//ongoing a session
router.post('/ongoingSession/:id', async (req, res) => {
  id=req.params.id;
  latitude=req.body.coordinatesCovered.latitude;
  longitude=req.body.coordinatesCovered.longitude;
  x={latitude,longitude};
  const session = await Session.findById(id);
  session.coordinatesCovered.push(x);
  const updatedSession = await session.save();
  res.send({
      _id: updatedSession._id
  }
  );
});

//end a session
router.post('/endSession/:id', async (req, res) => {
    id=req.params.id;
    const session = await Session.findById(id);
    session.endTimestamp=req.body.endTimestamp;
    const user=await User.findById(req.body.userId);
    user.sessions.push(id);
    const updatedUser=await user.save();
    const updatedSession = await session.save();
    res.send({
        _id: updatedSession._id,
        userId:updatedUser._id,
        updatedUser,
        updatedSession
    }
    );
});
//all session of a user
router.get('/allSession/:id', async (req, res) => {
    id=req.params.id;
    const user=await User.findById(id);
    const sessions=user.sessions;
    //populate seesion 
    const sessionArray=await Session.find({_id:{$in:sessions}});
    res.send(sessionArray);
});
module.exports = router;
