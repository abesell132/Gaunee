const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
