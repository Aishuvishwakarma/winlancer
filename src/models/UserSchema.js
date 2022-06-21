const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
 username:String,
 password:String,
 Refusers:[{type:mongoose.Schema.Types.ObjectId,ref:'refuser'}]
})

module.exports = mongoose.model('user',UserSchema)