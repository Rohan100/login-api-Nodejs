const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const Product = require('./mongo');
const mongoose = require('mongoose');
const initialize = require('./passport');
const sessoin = require('express-session');
const flash = require('express-flash')
const app = express();
const passport = require('passport');
const Product =  require('./product');

const uri =
  "mongodb+srv://rohan_ct:P80XO6FeYKzXVJYz@test.znx8q.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri,{ useUnifiedTopology: true , useNewUrlParser: true })


initialize(passport)

app.use(flash())
app.use(sessoin({
    secret: "secret key",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
// console.log(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded(
    {extended:true}
))

const data =[];


app.get('/',(req,res)=>{
    res.send(`<h1>hi ${ req.user.email }</h1>`)
})
app.post('/resister',async (req,res)=>{
    const hash = await bcrypt.hash(req.body.password,10)
 
    const product = new Product({
        _id:new mongoose.Types.ObjectId,
        email:req.body.email,
        pass:hash
    })
    product.save()
    .then(result=>{

        res.send(result)
    }).catch(err=>console.log(err))
  
})
app.get('/login',(req,res)=>{
    res.status(403).send(`<h1> Error: ${req.body} </h1>`)
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))
app.listen(6000,()=>console.log('server has started'))