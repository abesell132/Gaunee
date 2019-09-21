const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");
const passport = require("passport");

const Tenant = require("../../models/Tenant");

// @route   GET api/apartments/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Tenants Works" }));

module.exports = router;
