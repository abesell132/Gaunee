const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Payment = require("../../models/Payment");

// @route   GET api/apartments/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Tenants Works" }));

router.get("/all", passport.authenticate("jwt", { session: false }), (req, res) => {
  Payment.find()
    .then((payments) => res.json(payments))
    .catch((err) => res.status(404).json({ nopaymentsfound: "No payments found" }));
});

// @route   POST api/tenants/create
// @desc    Creates a new tenant
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const newPayment = await new Payment({
    status: req.body.status,
    type: req.body.type,
    datePaid: req.body.datePaid,
    scheduledDate: req.body.scheduledDate,
    amount: req.body.amount,
    property: req.body.property,
    unit: req.body.unit,
    category: req.body.category,
    description: req.body.description,
    notes: req.body.notes,
  });

  try {
    const payment = await newPayment.save();
    res.json(payment);
  } catch (e) {
    res.status(404).json({ msg: "Error Creating Payment" });
    console.log(e);
  }
});

router.post("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
  } catch (e) {}
});

router.post("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { paymentID } = req.body;

  try {
    await Payment.findByIdAndDelete(paymentID);
    await res.json({ msg: "Payment Deleted" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Error Deleting Payment" });
  }
});

module.exports = router;
