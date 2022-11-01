const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { collation: { locale: "en_US", strength: 1 } }
);

const model = mongoose.model("UserData", User);

module.exports = model;
