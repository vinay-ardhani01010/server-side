const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    emp_name:{
        type : String,
        required : true
    },
    org_name: {
        type: String,
        required : true
    },
    empid:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type : Number,
        required : true
    },
    password:{
       type:String,
       required:true 
    },
    id_card:{
        type : String,
        required : true
    },
    orders:{
        type : [Object],
        default : [],
        
    },
    created_at :{
        type : Date,
        default : Date
    }
});

const Users = mongoose.model('users',UserSchema);
module.exports  = Users;