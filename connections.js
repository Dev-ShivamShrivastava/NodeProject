const mongoose = require("mongoose");

// Connection
async function connnectMongoDB(url){
    return mongoose.connect(url)
    .then(()=> console.log("MongoDb Connected"))
    .catch(err=>console.log("Mongo Error"));
}

module.exports = {
    connnectMongoDB,
};



