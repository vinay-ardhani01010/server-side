const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductSchema = new Schema({
    item_name:{
        type : String,
        required :true
    },
    price:{
        type : Number,
        required : true
    },
    delivery_time:{
        type : Number,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    category:{
        type : Number,
        default : 0
    },
    image_url:{
        type: String,
        required : true
    }
});

const Products = mongoose.model('products',ProductSchema);
module.exports = Products;