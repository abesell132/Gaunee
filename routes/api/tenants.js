const express = require("express");
const router = express.Router();
const { deleteTenants } = require("./tenants.fncs.js");

const mongoose = require("mongoose");
const passport = require("passport");

const Tenant = require("../../models/Tenant");
const Unit = require("../../models/Unit");

// @route   GET api/apartments/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Tenants Works" }));

// @route   POST api/tenants/create
// @desc    Creates a new tenant
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const newTenant = await new Tenant({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
  });

  console.log(req.body);

  try {
    const tenant = await newTenant.save();

    let unit = await Unit.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.unitID) }, { $push: { tenants: tenant.id } }, { new: true });
    await console.log(unit);
    await res.json(tenant);
  } catch (e) {
    res.status(404).json({ msg: "Error Creating Tenant" });
    console.log(e);
  }
});

router.post("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let tenantID = req.body.tenantID;

  let updates = req.body;
  delete updates.tenantID;

  try {
    let tenant = await Tenant.findOneAndUpdate({ _id: mongoose.Types.ObjectId(tenantID) }, { $set: updates }, { new: true });
    await res.json(tenant);
  } catch (e) {
    res.status(404).json({ msg: "Error Updating Tenant" });
    console.log(e);
  }
});

router.post("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { tenantID } = req.body;

  try {
    deleteTenants(tenantID);

    await res.json({ msg: "Tenant Deleted" });
  } catch (e) {
    res.status(404).json({ msg: "Error Deleting Tenant" });
    console.log(e);
  }
});

module.exports = router;
