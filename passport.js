const localstratargy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const Product =  require('../product');
mongoose = require('mongoose');

const uri =
  "mongodb+srv://rohan_ct:P80XO6FeYKzXVJYz@test.znx8q.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri,{ useUnifiedTopology: true , useNewUrlParser: true })

let initialize = (passport) => {
    
    const authenticcateUser =async (email,password,done) => {
        console.log('emial',email)
        let user = await Product.findOne({email:email})
        console.log("user",user)
        if(user == null) {
            return done(null,false,{message:'No user with that email'})
        }

        try{
            let match = await bcrypt.compare(password,user.pass)
            if(match){
                console.log("in try")
                return done(null,user)
            }
            else{
                console.log("in else")
                return done(null,false,{message:'Password incorrect'})
            }
        }
        catch(e){
            return done(e)
        }
    }

    passport.use(new localstratargy({usernameField:'email'},authenticcateUser))  
    passport.serializeUser((user,done) => { 
        console.log("user in serialize",user)
        return done(null, user._id) 
    })
    passport.deserializeUser(async (_id,done) => {
        const result = await Product.findOne({_id:_id})
      return  done(null,result)
    })
} 


module.exports = initialize;