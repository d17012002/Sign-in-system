const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://webconnect:webconnect123@cluster0.tnchb.mongodb.net/firefoxDB");

const firefoxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is compulsory"],
  },
  email: {
    type: String,
    required: [true, "email is compulsory"],
  },
  password: {
    type: String,
    required: [true, "password is compulsory"],
  },
});

const FirefoxUser = mongoose.model("FirefoxUser", firefoxSchema);

module.exports.Anurag = new FirefoxUser({
  name: "Anurag Kumar",
  email: "anuragkumar2020@vitbhopal.ac.in",
  password: "anurag123",
});

module.exports.FirefoxUser = FirefoxUser;
