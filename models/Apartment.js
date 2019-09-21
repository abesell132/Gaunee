const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  propertyID: {
    type: Schema.Types.ObjectId,
    ref: "properties",
    required: true
  },
  buildingID: {
    type: Schema.Types.ObjectId,
    ref: "buildings",
    required: false
  },
  availability: {
    type: String,
    required: false
  },
  monthlyRent: {
    type: String,
    required: false
  },
  tenants: [
    {
      type: Schema.Types.ObjectId,
      ref: "tenants"
    }
  ]
});

module.exports = Apartment = mongoose.model("apartments", ApartmentSchema);
