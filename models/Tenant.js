const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TenantSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    requird: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  leases: [
    {
      type: Schema.Types.ObjectId,
      ref: "leases",
    },
  ],
});

module.exports = Tenant = mongoose.model("tenants", TenantSchema);
