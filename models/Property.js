const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  type: {
    //   House, Building, Multi-Building
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  houseNumber: {
    type: String
  },
  streetName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }
});

module.exports = Property = mongoose.model("properties", PropertySchema);
