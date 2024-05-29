const { model, Schema } = require("mongoose");

let userConfig = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  premium: {
    type: Boolean,
    required: true,
    default: false,
  },
  dataOptOut: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = model("userConfig", userConfig);
