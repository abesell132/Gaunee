const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    requird: true,
  },

  datePaid: {
    type: Date,
    required: false,
  },
  scheduledDate: {
    type: Date,
    required: false,
  },

  amount: {
    type: Number,
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "properties",
    required: false,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "units",
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

module.exports = Payment = mongoose.model("payments", PaymentSchema);
