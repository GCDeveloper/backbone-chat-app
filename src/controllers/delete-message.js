const MessageModel = require("../models/MessageModel")();
//delete message
module.exports = function(_id, cb = Function.prototype) {
  if (!_id) {
    cb(400);
  } else {
    MessageModel.remove({ _id }, function(err) {
      if (err) {
        cb(500);
      } else {
        cb(null);
      }
    });
  }
};
