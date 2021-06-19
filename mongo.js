const mongoose = require('mongoose');
const product = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    pass:String,
    
})
module.exports = mongoose.model('auth',product)