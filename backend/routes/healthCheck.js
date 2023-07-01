const express = require("express")
const router  = express.Router();


router.get('/hello', (req,res) => {
    res.send("Health Check Okay");
})

module.exports = router