const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: false
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: false
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
  },
  country: {
    type: String,
    default: "United States"
  },
  units: [
    {
      rent: {
        type: Number,
        required: true
      },
      baths: {
        type: Number
      },
      beds: {
        type: Number
      },
      squareFeet: {
        type: Number
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Apartment = mongoose.model("apartments", ApartmentSchema);
