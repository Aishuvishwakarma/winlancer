const mongoose = require('mongoose');


const RefUserSchema = new mongoose.Schema({
 first_name:String,
 last_name:String,
 email:String,
 userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
})

module.exports = mongoose.model('refuser',RefUserSchema) 