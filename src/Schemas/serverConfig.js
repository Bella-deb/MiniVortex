const { model, Schema } = require("mongoose");

let serverConfig = new Schema({
  Guild: {
    type: String,
    required: true,
    unique: true,
  },
  premium: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = model("serverConfig", serverConfig);
