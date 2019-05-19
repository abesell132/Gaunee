const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");
const passport = require("passport");

const Apartment = require("../../models/Apartment");

const validateApartmentInput = require("../../validation/createApartment");

// @route   GET api/apartments/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   POST api/apartments/create
// @desc    Creates Apartment
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Remove $ sign from Rent Submission
    let units = req.body.units;
    for (let i = 0; i < units.length; i++) {
      units[i].rent = units[i].rent.replace("$", "");

      // Grab Tenant Email Address entered
      // Search to see if email exists
      // YES: return ID of tenant, store in unit
      // NO: create Tenant, store ID In Unit
    }
    let apartmentName;
    if (!req.body.name) {
      apartmentName = req.body.address1;
    } else {
      apartmentName = req.body.name;
    }

    const newApartment = new Apartment({
      owner: req.user.id,
      name: apartmentName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      units: units
    });
    newApartment
      .save()
      .then(apartment => {
        res.json(apartment);
      })
      .catch(err => {
        console.log(err);
        res.status(402).json({
          error: err
        });
      });
  }
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Apartment.find({ owner: req.user.id })
      .then(apartment => {
        if (apartment) {
          res.send(apartment);
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
);

// @route   POST api/apartments/create
// @desc    Creates Apartment
// @access  Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let apartmentID = req.body.id;
    console.log(apartmentID);
    Apartment.deleteOne({ _id: ObjectId(apartmentID) }, err => {
      if (!err) {
        res.send("Success");
      } else {
        res.json(err);
      }
    });
  }
);

module.exports = router;
