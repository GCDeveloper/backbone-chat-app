const express = require("express");
const router = express.Router();
const createMessage = require("../controllers/create-message");
const checkMessages = require("../controllers/check-messages");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Backbone Chat app 0.0.1" });
});

//post to /message should contain message in body
//post to /check can contain msSinceLastCheck in body
router.post("/:type", function(req, res, next) {
  console.log("post to /", "params:", req.params);
  const type = req.params.type;
  const message = req.body.message;
  if (type === "message") {
    createMessage(message, function(status, doc) {
      if (status) {
        res.status(status).json({
          success: false //,reason: String
        });
      } else {
        //message successfully saved to database
        res.status(200).json({
          success: true,
          doc
        });
      }
    });
  } else if (type === "check") {
    //check if there were any messages in the last 5 seconds
    //if msSinceLastCheck doesn't parse into a number, set it to 3 minutes.
    checkMessages(
      parseInt(req.body.msSinceLastCheck) || 1000 * 60 * 3,
      function(status, messages) {
        if (status) {
          res.status(status).json({
            success: false
          });
        } else if (Array.isArray(messages)) {
          res.status(200).json({
            success: true,
            messages
          });
        } else {
          res.status(500).json({
            success: false,
            reason: "messages are not an array: " + typeof messages
          });
        }
      }
    );
  } else {
    res.status(400).json({
      success: false,
      reason: "unknown POST type " + type
    });
  }
});
module.exports = router;
