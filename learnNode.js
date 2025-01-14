const express = require('express');
const userRouter = require("./routes/users");
const { connnectMongoDB } = require("./connections");
require('dotenv').config()


const app = express();
const PORT = 4000

 
// Connection
connnectMongoDB("mongodb://127.0.0.1:27017/shivamDB");

// Middleware - plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));


//Routes
app.use("/",userRouter);


//Listner
app.listen(PORT, function () {
  console.log(`app listening on port: ${PORT}!`);
}); 