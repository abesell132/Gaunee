const express = require("express");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const passport = require("passport");

const Messages = require("../../models/Messages");

// @route   GET api/messages/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Messages Works" }));

// @route   POST api/messages/new-message
// @desc    Creates New Message to Store in the Database
// @access  Private
router.post(
  "/new-message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMessage = new Messages({
      sender: req.user.id,
      recipient: req.body.recipient,
      content: req.body.content
    });

    newMessage
      .save()
      .then(message => {
        res.json(message);
      })
      .catch(err => {
        res.status(400).json({
          errror: err
        });
      });
  }
);

// @route   GET api/messages/conversation
// @desc    Fetches conversation for a given User
// @access  Private
router.get(
  "/conversation",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let requestedUser = req.user.id;
    let conversationID = req.body.conversationID;

    Messages.find(
      {
        sender: requestedUser,
        recipient: ObjectId(conversationID)
      },
      (err, messages) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(messages);
        }
      }
    );
  }
);

module.exports = router;
