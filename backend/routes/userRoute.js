const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const Session = require("../Models/Session");
const Issue = require("../Models/Issue");

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
      let userName = userData.name;
      return res.json({ success: true, userRole:userRole, userEmail:userEmail, userId:userId,name:userName})

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
    console.log('session',session)
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

//Adding a issue to a session
router.post('/addIssue/:id', async (req, res) => {
    id=req.params.id;
    const session = await Session.findById(id);
    session.issues.push(req.body.issueId);  
    const updatedSession = await session.save();
    res.send({
        _id: updatedSession._id
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

//all issues of a session
router.get('/allIssues/:id', async (req, res) => {
    id=req.params.id;
    const session=await Session.findById(id);
    const issues=session.issues;
    //populate issues
    const issueArray=await Issue.find({_id:{$in:issues}});
    res.send(issueArray);
});

//create issues
router.post('/createIssue/:id', async (req, res) => {
    latitude=req.body.position.latitude,
    longitude=req.body.position.longitude,
    x={latitude,longitude}
        
    const issue = new Issue({
        photo: req.body.photo,
        description:req.body.description,
        position:x
        
    });
    const createdIssue = await issue.save();
    const session=await Session.findById(req.params.id);
    session.issues.push(createdIssue._id);
    const updatedSession=await session.save();
    res.send({
        _id: createdIssue._id,
        photo: createdIssue.photo,
        description: createdIssue.description,
        position: createdIssue.position
    })
});
router.get('/allIssuesOfUser/:id', async (req, res) => {
    id=req.params.id;
    const user=await User.findById(id);
    const sessions=user.sessions;
    //populate seesion
    const sessionArray=await Session.find({_id:{$in:sessions}});
    const issues=[];
    for(let i=0;i<sessionArray.length;i++){
        issues.push(sessionArray[i].issues);
    }
    const issueArray=await Issue.find({_id:{$in:issues}});
    res.send(issueArray);
});
module.exports = router;
