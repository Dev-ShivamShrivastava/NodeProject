const mongoose = require("mongoose")


//Scheme
const userScheme = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  phoneNo: {
    type: String
  },
  gender: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
   dob: {
    type: String,
    required: true
  }
}, { timestamps: true })

//Models
const UserModel = mongoose.model("user", userScheme);

module.exports = UserModel;