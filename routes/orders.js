const express = require('express');
const router = express.Router();
const Users  = require('../models/Users.js');
const Orders = require('../models/ordersRecieved.js')
router
     .post("/userOrders", async (req,res)=>{
         const user_id = req.body.user_id;
         var object = {
             imgUrl : req.body.imgUrl,
             item_name : req.body.item_name,
             price: req.body.price,
             count : req.body.count
         }
         //console.log(object);
         var user = await  Users.findOne({_id : user_id});
         if(user){
             user.orders.push(object);
             user.save();
             console.log('user order added');
         }
         else{
             res.status(400).json('Something went wrong while adding order..')
         }
         const emp_id = user.empid;
         Orders.create({
             emp_id : emp_id,
             imgUrl: req.body.imgUrl,
             item_name : req.body.item_name,
             price : req.body.price,
             count : req.body.count
            })
            .then(()=>res.json('Order sent'),console.log('Order sent'))
            .catch((err)=> res.status(500).json('Error :'+err));
         })
         .post('/ordersForUser', async (req,res)=>{
             console.log(req.body);
             const user_id = req.body.user_id;
             const user = await Users.findOne({_id : user_id});
            //console.log(user.orders);
             res.json(user.orders);
   
         })
router 
      .get('/showOrders',(req,res)=>{
          Orders.find({})
          .then((array)=>{
              res.json(array);
          })
          .catch((err)=> res.status(500).json('Error :'+ err));
      })
      .delete('/showOrders',(req,res)=>{
          Orders.remove({})
          .then(()=> res.status(200).json('Deleted sucessfully'))
          .catch((err)=> res.json(500).json('Error :'+err));

      })
module.exports = router;
