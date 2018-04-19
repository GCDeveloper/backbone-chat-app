const MessageModel = require("../models/MessageModel")();
const disallowedMessages = []; //allow all messages
//create message
//todo - use something like websockets (socket.io) to tell all clients (except the emitter) that
//there is a new messages
//for now just simply poll the server every 5 seconds
module.exports = function(message, cb = Function.prototype) {
  if (!message || disallowedMessages.indexOf(message.toLowerCase()) != -1) {
    cb(400);
  } else {
    MessageModel.create({ message }, function(err, doc) {
      if (err) {
        cb(500);
      } else {
        cb(null, doc.toJSON());
      }
    });
  }
};
