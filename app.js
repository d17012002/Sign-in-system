const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require(__dirname + "/mongoDB.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  db.FirefoxUser.find(function (err, firefoxusers) {
    if (firefoxusers.length === 0) {
      db.Anurag.save();
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
    db.FirefoxUser.find({email: Email}, function(err, firefoxusers){
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
  const newFirefoxUser = new db.FirefoxUser({
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
    db.FirefoxUser.find(function(err, firefoxusers){
        if(err){
            console.log(err);
        }else{
            res.render("users", {key: firefoxusers});
        }
    });
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on port 3000");
});
