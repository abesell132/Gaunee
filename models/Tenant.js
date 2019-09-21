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
  homePhone: {
    type: String,
    requird: false
  },
  workPhone: {
    type: String,
    requird: false
  },
  email: {
    type: String,
    required: false
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Tenant = mongoose.model("tenants", TenantSchema);
