const mongoose = require("mongoose");
const mongodbURI = "mongodb://user:password@db-address:db-port/db-name";
function initializeDB(onOpen = Function.prototype) {
  mongoose.connect(mongodbURI);

  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;

  //Get the default connection
  const db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  db.on("open", function(err, info) {
    if (!err) {
      console.log("connected to db");
      onOpen();
    } else {
      console.error("error in db open event / connected", err);
    }
  });
  db.on("disconnected", function(err, info) {
    if (!err) {
      console.log("disconnected from db");
    } else {
      console.error("error in db disconnected event", err);
    }
  });
  return { db, mongoose };
}
module.exports = initializeDB;
