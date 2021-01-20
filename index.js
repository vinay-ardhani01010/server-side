const express = require('express');
const app = express();
var mongoose = require('mongoose');
const url = "mongodb+srv://new_user:pragati456@cluster0.xxmjo.mongodb.net/node-mongo?retryWrites=true&w=majority";
const Users = require('./models/Users.js');
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
    var Email = req.body.email;
    const password = req.body.password;
    Users.create({empid:empid,email:Email,password:password});
})

app.post('/login', async (req,res)=>{
    const empid = req.body.empid;
    const password = req.body.password;
    console.log(req.body);
    const user = await Users.findOne({empid:empid})
    if(user){
        console.log(user.password);
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
//CONNECT TO DB

const connect = mongoose.connect(url);
connect.then(()=>{
    console.log('connected to database');
})

//SERVER

app.listen(3000,()=>{
    console.log('server is listening at the port 3000');
})