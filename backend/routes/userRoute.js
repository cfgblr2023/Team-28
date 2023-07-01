const express = require('express');
const router = express.Router();
const User= require('../Models/User.js');

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

module.exports = router;
