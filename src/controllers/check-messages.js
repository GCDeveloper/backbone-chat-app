const MessageModel = require("../models/MessageModel")();
//check messages
//this is polled every 5 - 10 seconds... and has major limitations
//web sockets would be a much better solution (use socket.io)
//defaults to 10 seconds
module.exports = function(msLastChecked = 10000, cb) {
  if (typeof cb != "function") {
    throw new Error("no callback provided to checkMessages");
  }
  if (typeof msLastChecked != "number") {
    throw new Error("msSinceLastCheck must be a number");
  }
  if (msLastChecked < 1000 || msLastChecked > 1000 * 60 * 30) {
    throw new Error(
      "can only check for messages between 1 second and 30 minutes"
    );
  }
  MessageModel.find(
    { createdAt: { $gte: Date.now() - msLastChecked } },
    function(err, docs) {
      if (err) {
        cb(500);
      } else {
        if (docs.length === 0) {
          console.log(
            "no messages found in the last " +
              msLastChecked / 1000 +
              " seconds."
          );
        }
        //want to sort docs by createdAt so they are in order for client ?
        //although client will have to ensure this
        cb(
          null,
          docs
            .map(doc => doc.toJSON())
            .sort((a, b) => a.createdAt - b.createdAt)
        );
      }
    }
  );
};
