const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  city : [
    {
        type: String,
    }
  ]
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;