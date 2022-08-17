const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: "units",
    },
  ],
});

module.exports = Property = mongoose.model("properties", PropertySchema);
