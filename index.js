const express = require('express');
const app = express();
var mongoose = require('mongoose');
const url = "mongodb+srv://new_user:pragati456@cluster0.xxmjo.mongodb.net/node-mongo?retryWrites=true&w=majority";
const Users = require('./models/Users.js');
const Products = require('./models/Products.js');
const ejs = require('ejs');
const bodyParser = require('body-parser');

//MIDDLE WARE
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));
app.set('view engine','ejs');

//ROUTES
app.get("/",(req,res)=>{
    res.render('AddUser.ejs');
})

app.get("/login",(req,res)=>{
    res.render('authUser.ejs');
})

app.post('/signup',(req,res)=>{
    var empid = req.body.empid;
    var email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const emp_name = req.body.emp_name;
    const org_name = req.body.org_name;
    const id_card = req.body.id_card;

    Users.create({
        emp_name : emp_name,
        org_name : org_name,
        empid : empid,
        email : email,
        mobile : mobile,
        password : password,
        id_card : id_card    
    });
})

app.post('/login', async (req,res)=>{
    const empid = req.body.empid;
    const password = req.body.password;
    console.log('recieved object = ');
    console.log(req.body.empid);
    const user = await Users.findOne({empid:empid})
    if(user){
        console.log(user.orders);
        if(user.password == password){
            res.json(user._id);
        }
        else{
            res.json('Incorrect Password');
        }
    }
    else{
        res.json('No User Exists');
    }
    
})

app.get('/show',(req,res)=>{
    Users.find({})
    
    .then((list)=>{
        res.json(list);
    })
})
// PRODUCT ROUTES

app.get('/addproduct',(req,res)=>{
    res.render('Add.ejs');
})

app.get('/showItems',(req,res)=>{
    Products.find({})
    .then((array)=>{
        res.json(array);
    })
})

app.post('/add',(req,res) =>{
    console.log(req.body);
    const item_name = req.body.name;
    const price = req.body.price;
    const delivery_time = req.body.time;
    const description = req.body.description;
    const category = req.body.category;
    const image_url = req.body.imgUrl;

    Products.create({item_name:item_name,price:price,delivery_time:delivery_time,description:description,
        category:category,image_url:image_url
    });
    res.json('Item Added Sucessfully');

})
//CONNECT TO DB

const connect = mongoose.connect(url);
connect.then(()=>{
    console.log('connected to database');
})

//SERVER

app.listen(process.env.PORT || 3000,()=>{
    console.log('server started');
 })