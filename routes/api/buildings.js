const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");
const passport = require("passport");

const Building = require("../../models/Building");

// @route   GET api/buildings/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Buildings Works" }));

module.exports = router;
