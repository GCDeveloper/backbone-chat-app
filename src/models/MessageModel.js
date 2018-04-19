const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Message
const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true //updatedAt and createdAt
  }
);
function defineModel(s, model) {
  return mongoose.modelNames().indexOf(s) === -1
    ? mongoose.model(s, model)
    : mongoose.connection.model(s);
}
//only retrieved if there is a connection
module.exports = function() {
  return defineModel("Message", MessageSchema);
};
