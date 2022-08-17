const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Tenant = require("../../models/Tenant");
const Lease = require("../../models/Lease");

const { deleteLeases } = require("../../routes/api/leases.fncs");

// @route   GET api/apartments/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Tenants Works" }));

// @route   POST api/tenants/create
// @desc    Creates a new tenant
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const newLease = await new Lease({
    leaseName: req.body.leaseName,
    leaseStart: req.body.leaseStart,
    leaseEnd: req.body.leaseEnd,
    monthToMonth: req.body.monthToMonth,
    leaseRate: req.body.leaseRate,
    leaseDeposit: req.body.leaseDeposit,
  });

  try {
    const lease = await newLease.save();

    let tenant = await Tenant.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.tenantID) }, { $push: { leases: lease.id } }, { new: true });
    await console.log(tenant);
    await res.json(lease);
  } catch (e) {
    res.status(404).json({ msg: "Error Creating LEase" });
    console.log(e);
  }
});

router.post("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { leaseID } = req.body;
  let updates = req.body;

  delete updates.leaseID;

  console.log(req.body);

  try {
    let doc = await Lease.findOneAndUpdate({ _id: mongoose.Types.ObjectId(leaseID) }, updates);
    console.log(doc);
    await res.json({ msg: "Lease updated" });
  } catch (e) {
    res.status(404).json({ msg: "Error updating lease" });
    console.log(e);
  }
});

router.post("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { leaseID } = req.body;

  try {
    await deleteLeases([leaseID]);
    await res.json({ msg: "Lease deleted" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Error deleting lease" });
  }
});

module.exports = router;
