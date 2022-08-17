const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LeaseSchema = new Schema({
  leaseName: {
    type: String,
    required: true,
  },
  leaseStart: {
    type: Date,
    requird: true,
  },
  leaseEnd: {
    type: String,
    required: false,
  },
  monthToMonth: {
    type: Boolean,
    required: true,
  },
  leaseRate: {
    type: Number,
    required: true,
  },
  leaseDeposit: {
    type: Number,
    required: true,
  },
});

module.exports = Lease = mongoose.model("leases", LeaseSchema);
