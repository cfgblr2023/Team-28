const express = require('express');
const router = express.Router();
const User= require('../Models/User.js');
const Issue=require('../Models/Issue.js');
const Session=require('../Models/Session.js');

//create a user
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
    })
});

router.post('/login', async (req, res) => {
    const {email,password}=req.body;

    //check if email and password is entered by user
    if(!email || !password){
        res.send("Please enter email or password");
    }

    //finding user in database
    const user=await User.findOne({email});

    if(!user){
        res.send("User not found");
    }

    //check if password is correct or not
    if(user.password===password){
        res.send("Login Successfull");
    }
    else{
        res.send("Invalid username or password");
    }
    });

    //create issues
    router.post('/createIssue', async (req, res) => {
    latitude=req.body.position.latitude,
    longitude=req.body.position.longitude,
    x={latitude,longitude}
        
    const issue = new Issue({
        photo: req.body.photo,
        description:req.body.description,
        position:x
        
    });
    const createdIssue = await issue.save();
    res.send({
        _id: createdIssue._id,
        photo: createdIssue.photo,
        description: createdIssue.description,
        position: createdIssue.position
    })
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
    res.send(
        
        createdSession   
    )
});


module.exports = router;
