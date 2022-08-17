const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");
const passport = require("passport");

const Unit = require("../../models/Unit");
const { deleteUnits } = require("./units.fncs");

// @route   GET api/units/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Units Works" }));

router.post("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { unitID, identifier, availability, monthlyRent, securityDeposit } = req.body;

  let updates = req.body;
  delete updates.unitID;

  console.log(updates);

  try {
    let doc = await Unit.findOneAndUpdate({ _id: mongoose.Types.ObjectId(unitID) }, updates);

    console.log(doc);

    await res.json({ msg: "Unit updated" });
  } catch (e) {
    res.status(404).json({ msg: "Error updating unit" });
    console.log(e);
  }
});

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let propertyID = req.body.propertyID;

  let newUnit = new Unit({
    identifier: req.body.identifier,
    availability: req.body.availability,
    monthlyRent: req.body.monthlyRent,
    securityDeposit: req.body.securityDeposit,
    baths: req.body.baths,
    beds: req.body.beds,
    tenants: [],
  });

  let unit = await newUnit.save();

  try {
    let doc = await Property.findOneAndUpdate({ _id: mongoose.Types.ObjectId(propertyID) }, { $push: { units: unit._id } }, { new: true });
    console.log(doc);
    await res.json({ msg: "Unit created" });
  } catch (e) {
    res.status(404).json({ msg: "Error creating unit" });
    console.log(e);
  }
});

router.post("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let { unitID } = req.body;

  try {
    await console.log(unitID);
    await deleteUnits(unitID);

    await res.json({ msg: "Unit deleted" });
  } catch (e) {
    res.status(404).json({ msg: "Error deleting unit" });
    console.log(e);
  }
});
module.exports = router;
