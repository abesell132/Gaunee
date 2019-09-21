const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");
const passport = require("passport");

const Property = require("../../models/Property");

// @route   GET api/properties/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Properties Works" }));

// @route   GET api/properties/all
// @desc    Tests post route
// @access  Public
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Received");
    Property.find({
      ownerID: mongoose.Types.ObjectId(req.user.id)
    })
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   GET api/properties/create
// @desc    Tests post route
// @access  Public
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let propertyName = req.body.name;
    if (!req.body.name) {
      propertyName =
        req.body.houseNumber + " " + req.body.streetName + " " + req.body.city;
    }

    const newProperty = new Property({
      ownerID: req.user.id,
      name: propertyName,
      type: req.body.type,
      houseNumber: req.body.houseNumber,
      streetName: req.body.streetName,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    });

    newProperty
      .save()
      .then(property => {
        res.json(property);
        // const newProfile = new Profile({
        //   firstName: req.body.name,
        //   user: mongoose.Types.ObjectId(user._id)
        // });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
