const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: String,
  phoneNo: String,
  service: String,
  message: String,
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);