const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

require('dotenv').config();

require('./src/DB/dbconfig').MongoDbConfig();

const indexRouter = require('./src/Routes/index')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',indexRouter)

app.listen(process.env.PORT,()=>console.log('server running on port 3000'))