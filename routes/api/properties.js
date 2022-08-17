const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Property = require("../../models/Property");
const Unit = require("../../models/Unit");
const { deleteProperties } = require("./properties.fncs");

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let units = await emptyUnits(req.body.numUnits);

  const newProperty = await new Property({
    ownerID: req.user.id,
    houseNumber: req.body.houseNumber,
    streetName: req.body.streetName,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    units,
  });

  try {
    const property = await newProperty.save();
    await res.json(property);
  } catch (e) {
    res.status(404).json({ msg: "Error Creating Property" });
    console.log(e);
  }
});

router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res) => {
  Property.find()
    .populate("units")
    .populate({
      path: "units",
      populate: {
        path: "tenants",
        model: "tenants",
      },
    })
    .populate({
      path: "units",
      populate: {
        path: "tenants",
        populate: {
          path: "leases",
          model: "leases",
        },
      },
    })
    .exec(function (err, docs) {
      if (err) {
        res.status(500).send("Fetching Properties Failed");
        return console.log(err);
      }
      res.json(docs);
    });
});

router.post("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let propertyID = req.body.propertyID;
  let updates = req.body;
  delete updates.propertyID;

  try {
    let doc = await Property.findOneAndUpdate({ _id: mongoose.Types.ObjectId(propertyID) }, updates, { new: true });
    console.log(doc);
    await res.json({ msg: "Property updated" });
  } catch (e) {
    res.status(404).json({ msg: "Error updating property" });
    console.log(e);
  }
});

router.post("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let propertyID = req.body.propertyID;

  try {
    await deleteProperties(propertyID);
    await res.json({ msg: "Property Deleted" });
  } catch (e) {
    res.status(404).json({ msg: "Error Deleting Property" });
    console.log(e);
  }
});

module.exports = router;

async function emptyUnits(numUnits) {
  let units = [];

  for (let i = 0; i < numUnits; i++) {
    const newUnit = new Unit({
      identifier: `Unit ${i + 1}`,
      availability: "available",
      monthlyRent: 0,
      securityDeposit: 0,
      tenants: [],
    });

    const unit = await newUnit.save();
    units.push(mongoose.Types.ObjectId(unit._id));
  }

  return units;
}
