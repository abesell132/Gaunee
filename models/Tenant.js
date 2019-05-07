const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TenantSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    requird: true
  },
  phone: {
    type: String,
    requird: false
  },
  email: {
    type: String,
    required: false
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "apartments"
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "apartments"
  }
});

module.exports = Tenant = mongoose.model("tenant", TenantSchema);
