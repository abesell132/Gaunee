const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  propertyID: {
    type: Schema.Types.ObjectId,
    ref: "properties"
  },
  identifier: {
    //   304, 102a, etc
    type: String,
    required: true
  }
});

module.exports = Building = mongoose.model("buildings", BuildingSchema);
