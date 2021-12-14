const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://webconnect:webconnect123@cluster0.tnchb.mongodb.net/firefoxDB");

var key;

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

const Anurag = new FirefoxUser({
  name: "Anurag Kumar",
  email: "anuragkumar2020@vitbhopal.ac.in",
  password: "anurag123",
});

const defaultArray = [Anurag];

app.get("/", function (req, res) {
  FirefoxUser.find(function (err, firefoxusers) {
    if (firefoxusers.length === 0) {
      Anurag.save();
      console.log("Default users added");
    }
    if (err) {
      console.log(err);
    } else {
      res.render("home");
    }
  });
});

app.get("/signin", function (req, res) {
  res.render("signin");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/main", function (req, res) {
  res.render("main");
});

app.get("/error", function (req, res) {
  res.render("error");
});

app.post("/error", function(req, res){
    res.redirect("/signin");
});

app.post("/", function (req, res) {
  if (req.body.btn1 === "signin") {
    res.redirect("/signin");
  }
  if (req.body.btn2 === "signup") {
    res.redirect("/signup");
  }
});

app.post("/signin", function (req, res) {
    var Email = req.body.ename;
    var Pass = req.body.psw;
    FirefoxUser.find({email: Email}, function(err, firefoxusers){
        if(err){
            console.log(err);
        }
        if(!firefoxusers.length){
            res.redirect("/error");
        }else{
            firefoxusers.forEach(function (firefoxuser){
                if(Pass == firefoxuser.password) {
                    res.redirect("/main");
                }else{
                    res.redirect("/error");
                }
            });
        }
    });
});

app.post("/signup", function (req, res) {
  var NAME = req.body.name;
  var EMAIL = req.body.email;
  var PASSWORD = req.body.psw;
  const newFirefoxUser = new FirefoxUser({
    name: NAME,
    email: EMAIL,
    password: PASSWORD,
  });
  newFirefoxUser.save();
  res.redirect("/main");
});

app.post("/main", function (req, res) {
    res.redirect("/users");
  });

app.get("/users", function (req, res) {
    FirefoxUser.find(function(err, firefoxusers){
        if(err){
            console.log(err);
        }else{
            res.render("users", {key: firefoxusers});
        }
    });
  });

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
