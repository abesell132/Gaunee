const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  homePhone: {
    type: String,
    required: false
  },
  workPhone: {
    type: String,
    required: false
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
