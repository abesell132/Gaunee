const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  // propertyID: {
  //   type: Schema.Types.ObjectId,
  //   ref: "properties",
  //   required: true,
  // },
  identifier: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: false,
  },
  monthlyRent: {
    type: String,
    required: false,
  },
  securityDeposit: {
    type: Number,
    required: false,
  },
  baths: {
    type: Number,
    required: false,
    default: 0,
  },
  beds: {
    type: Number,
    required: false,
    default: 0,
  },
  tenants: [
    {
      type: Schema.Types.ObjectId,
      ref: "tenants",
    },
  ],
});

module.exports = Unit = mongoose.model("units", UnitSchema);
