const assert = require("assert");
const mongoose = require("mongoose");
const initializeDB = require("../dist/init/connect-to-db"); //connect to db (returns db)
const createMessage = require("../dist/controllers/create-message");
const deleteMessage = require("../dist/controllers/delete-message");
const checkMessages = require("../dist/controllers/check-messages");
describe("database and db handlers", function() {
  this.timeout(4000);
  before(function(amReady) {
    if (mongoose.connection.readyState === 0) {
      initializeDB(amReady);
    } else {
      console.log("already connected");
      amReady();
    }
  });
  it("should have connect to the database, setting readyState on mongoose.connection to 1", function() {
    assert.equal(mongoose.connection.readyState, 1);
  });
  describe("#createMessage, #checkMessages and #deleteMessage.", function() {
    this.timeout(7000);
    it("should createMessage and callback with no error and a non-empty document...\r\n...then checkMessages before this message is deleted (check from previous 5 seconds), returning without error and a non-empty array in the callback...\r\n...then delete this message with no error after 5 seconds.", function(done) {
      createMessage(
        "this is a test message " + Math.floor(Math.random() * 10000),
        function(err, doc) {
          setTimeout(function() {
            checkMessages(5000, function(checkErr, messages) {
              if (
                (!err && checkErr) ||
                !Array.isArray(messages) ||
                messages.length === 0
              ) {
                err =
                  "checkMessages error: " +
                    checkErr +
                    " is array? " +
                    Array.isArray(messages) +
                    " has at least 1 messages? " +
                    messages.length >
                  0;
              } else {
                console.log(
                  "found " +
                    messages.length +
                    " message" +
                    (messages.length !== 1 ? "s" : "")
                );
              }
            });
          }, 2500);
          //delete the message in 20 seconds
          setTimeout(function() {
            deleteMessage({ _id: doc._id }, function(deleteErr) {
              done(err || deleteErr || !doc || !doc._id || !doc.message);
            });
          }, 5000);
        }
      );
    });
    it("(checkMessages) should throw an error if invalid msSinceLastCheck (if not a number, < 1000ms, or > 30 minutes)", function(done) {
      try {
        checkMessages(500, function() {
          done("Should have thrown an error");
        });
        checkMessages("QWERTY", function() {
          done("Should have thrown an error");
        });
        checkMessages(1000 * 60 * 45, function() {
          done("Should have thrown an error");
        });
      } catch (err) {
        done(!err);
      }
    });
  });
});
