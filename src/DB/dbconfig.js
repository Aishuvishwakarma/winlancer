const mongoose = require('mongoose');

exports.MongoDbConfig = ()=>{
 mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('[DB_CONNECTED]'))
.catch(err=>console.log(err))
}