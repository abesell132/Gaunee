const express = require("express");
const router = express.Router();

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
    const { errors, isValid } = validateApartmentInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }
    const newApartment = new Apartment({
      owner: req.user.id,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    });

    newApartment
      .save()
      .then(apartment => {
        res.json(apartment);
      })
      .catch(err => {
        res.status(400).json({
          errror: err
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

module.exports = router;
