const express = require('express');
const router = express.Router();
router
     .get('/sample',(req,res)=>{
         res.json("using router module");
     });
module.exports = router;
