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
router.get("/test", (req, res) => res.json({ msg: "Apartments Works" }));

module.exports = router;
