const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrdersSchema = new Schema({
    emp_id:{
        type : String,
        required : true
    },
    imgUrl:{
        type : String,
        required : true
    },
    item_name:{
        type :  String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    count:{
        type : Number,
        required : true
    }

});

const ordersRecieved = mongoose.model('ordersRecieved',OrdersSchema);
module.exports = ordersRecieved;